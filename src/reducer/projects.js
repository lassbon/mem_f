import { CURRENT_PROJECTS, COMPLETED_PROJECTS } from "../types";

const initialState = {
  currentproject: [],
  completedproject: []
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
    default: 
      return state
  }
}
