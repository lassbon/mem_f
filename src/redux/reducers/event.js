import * as actions from '../actions'
import { normalize, schema } from 'normalizr'

const defaults = {
  completedEvents: null,
}

export const completedEvents = (state = defaults.completedEvents, action) => {
  if (action.type === actions.RECEIVED_COMPLETED_EVENT) {
    const completedEventListSchema = [new schema.Entity('requests')]
    const completedRequesters = normalize(
      action.payload,
      completedEventListSchema
    )
    return completedRequesters
  }
  return state
}
