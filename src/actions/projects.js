import { CURRENT_PROJECTS, COMPLETED_PROJECTS } from "../types";
import api from "../api";

const currentprojects = (projects) => ({
  type: CURRENT_PROJECTS,
  projects
});

const completedProjects = (completedProject) => ({
  type: COMPLETED_PROJECTS,
  completedProject
});

export const fetchCurrentProjects = (token) => dispatch =>
  api.projects.ongoing(token)
    .then(res => {
      dispatch(currentprojects(res.data))
    })
    .catch(err => {
      console.log('error', err)
    });

export const fetchCompletedProjects = (token) => dispatch =>
  api.projects.completed(token)
    .then(res => {
      dispatch(completedProjects(res.data))
    })
    .catch(err => {
      console.log('error', err)
    });

