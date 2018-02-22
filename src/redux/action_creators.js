import actions from './actions'

export const changeMainSection = ({ index: payload }) => ({
  action: actions.CHANGE_MAIN_SECTION,
  payload,
})
