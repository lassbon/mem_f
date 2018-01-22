import api from "../api";
import { USER_DONATIONS, USER_EVENTS, USER_TRAININGS, USER_MEMBERSHIPS } from '../types'

export const setUserDonations = donations => ({
  type: USER_DONATIONS,
  donations,
})

export const setUserEvents = events => ({
  type: USER_EVENTS,
  events,
})

export const setUserTrainings = trainings => ({
  type: USER_TRAININGS,
  trainings,
})

export const setUserMemberships = memberships => ({
  type: USER_MEMBERSHIPS,
  memberships,
})

export const getUserDonations = (id) => dispatch =>
  api.payments.donations(id).then(res => {
    dispatch(setUserDonations(res));
    return Promise.resolve(res)
  });

export const getUserEvents = id => dispatch =>
  api.payments.events(id).then(res => {
    dispatch(setUserEvents(res));
    return Promise.resolve(res)
  });

export const getUserTrainings = id => dispatch =>
  api.payments.trainings(id).then(res => {
    dispatch(setUserTrainings(res));
    return Promise.resolve(res)
  });

export const getUserMemberships = id => dispatch =>
  api.payments.memberships(id).then(res => {
    dispatch(setUserMemberships(res));
    return Promise.resolve(res)
  });
