import * as actions from '../actions'
import { normalize, schema } from 'normalizr'

const defaults = {
  completedEvents: null,
  ongoingEvents: null,
}

export const completedEvents = (state = defaults.completedEvents, action) => {
  if (action.type === actions.RECEIVED_COMPLETED_EVENTS) {
    const completedEventListSchema = [new schema.Entity('completed')]
    const completedEvents = normalize(action.payload, completedEventListSchema)
    return completedEvents
  }
  if (action.type === actions.LIKED_EVENT) {
    const event = state.entities.completed[action.payload.id]
    if (event) {
      const updatedEvent = {
        ...event,
        likes: [...event.likes, action.payload.liker],
      }

      return {
        ...state,
        entities: {
          completed: {
            ...state.entities.completed,
            [action.payload.id]: updatedEvent,
          },
        },
      }
    }
  }
  return state
}

export const ongoingEvents = (state = defaults.ongoingEvents, action) => {
  if (action.type === actions.RECEIVED_ONGOING_EVENTS) {
    const ongoingEventListSchema = [new schema.Entity('ongoing')]
    const ongoingEvents = normalize(action.payload, ongoingEventListSchema)
    return ongoingEvents
  }
  if (action.type === actions.LIKED_EVENT) {
    const event = state.entities.ongoing[action.payload.id]
    if (event) {
      const updatedEvent = {
        ...event,
        likes: [...event.likes, action.payload.liker],
      }

      return {
        ...state,
        entities: {
          ongoing: {
            ...state.entities.ongoing,
            [action.payload.id]: updatedEvent,
          },
        },
      }
    }
  }
  return state
}
