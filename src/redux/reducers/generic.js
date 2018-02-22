import * as actions from '../actions'

export const navigation = (state = {}, action) =>
  action.type === actions.CHANGE_MAIN_SECTION
    ? { ...state, ...action.payload }
    : state

const generic = {
  navigation,
}

export default generic
