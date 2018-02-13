import { CURRENT_PROJECTS, COMPLETED_PROJECTS, ALL_PROJECTS, PROJECTS_BY_ID } from "../types";

const initialState = {
  currentproject: [],
  completedproject: [],
  projects: []
}
export default function user(state = initialState, action = {}) {
  switch(action.type){
    case CURRENT_PROJECTS:
      return {
        currentproject: action.projects,
      }
    case COMPLETED_PROJECTS:
      return {
        completedproject: action.completedProject,
      };
    case PROJECTS_BY_ID:
      return {
        projects: action.payload
      }
    default: 
      return state
  }
}
