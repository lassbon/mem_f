import * as actions from '../actions'

const defaults = {
  searchBar: {
    key: ''
  }
}

export const searchBar = (state = defaults.searchBar, action) => {
  if (action.type === actions.CHANGE_SEARCHBAR_KEY) {
    return { key: action.payload}
  }
  return state
}
