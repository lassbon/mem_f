import * as actions from '../actions'
import { normalize, schema } from 'normalizr'

const defaults = {
  completedProjects: null,
  ongoingProjects: null,
}

export const completedProjects = (
  state = defaults.completedProjects,
  action
) => {
  if (action.type === actions.RECEIVED_COMPLETED_PROJECTS) {
    const completedProjectsSchema = [new schema.Entity('completed')]
    const completedProjects = normalize(action.payload, completedProjectsSchema)
    return completedProjects
  }
  return state
}

export const ongoingProjects = (state = defaults.ongoingProjects, action) => {
  if (action.type === actions.RECEIVED_ONGOING_PROJECTS) {
    const ongoingProjectsSchema = [new schema.Entity('ongoing')]
    const ongoingProjects = normalize(action.payload, ongoingProjectsSchema)
    return ongoingProjects
  }

  if (action.type === actions.LIKED_PROJECT) {
    const project = state.entities.ongoing[action.payload.id]
    if (project) {
      const updatedProject = {
        ...project,
        likes: [...project.likes, action.payload.liker],
      }

      return {
        ...state,
        entities: {
          ongoing: {
            ...state.entities.ongoing,
            [action.payload.id]: updatedProject,
          },
        },
      }
    }
  }

  return state
}
