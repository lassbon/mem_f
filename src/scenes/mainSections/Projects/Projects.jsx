import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import simpleScrollbar from 'fixed/simpleScrollbar'
import requestHandler from 'helpers/requestHandler'
import {
  receivedCompletedProjects,
  receivedOngoingProjects,
} from 'redux/action_creators'

const Projects = ({
  auth: { token },
  completedProjects,
  fetchCompletedProjects,
  fetchOngoingProjects,
  ongoingProjects,
  user,
}) => {
  if (!completedProjects) {
    fetchCompletedProjects(token)
    return 'fetching completed'
  }
  if (!ongoingProjects) {
    fetchOngoingProjects(token)
    return 'fetching ongoing'
  }
  return (
    <div
      ref={el => el && simpleScrollbar.initEl(el)}
      className="lg:h-full  bg-grey-lightest overflow-y-scroll"
    >
      <ul className="list-reset lg:px-16 py-8 flex flex-wrap">
        {ongoingProjects.result.map(id => {
          const project = ongoingProjects.entities.ongoing[id]

          return (
            <li className="lg:w-1/2 pr-4 mb-6">
              <Link
                to={`projects/ongoing/${id}`}
                className="w-full flex justify-center items-center bg-white lg:lt-shadow"
              >
                <div>
                  <figure className="relative">
                    <img src={project.banner} alt="" />
                    <figcaption
                      style={{
                        background:
                          'linear-gradient(to bottom, rgba(2,2,2,0) 0%,rgba(7,4,5,1) 100%)',
                      }}
                      className="absolute pin-b pin-l w-full p-8 py-4 text-white"
                    >
                      <h3 className="text-3xl hind">{project.title}</h3>
                    </figcaption>
                  </figure>
                  <div className="p-4 lg:px-8 lg:py-6 text-xs text-grey-darker">
                    <div className="pb-4 border-b border-grey-light font-bold roboto">
                      <span>{project.date}</span>
                      <span className="mx-4">
                        <i className="ion-arrow-right-c" />
                      </span>
                      {/* <span>End date</span> */}
                    </div>

                    <p className="mt-4">{project.description}</p>
                  </div>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const mapStateToProps = ({
  auth,
  completedProjects,
  ongoingProjects,
  user,
}) => ({
  auth,
  completedProjects,
  ongoingProjects,
  user,
})

const mapDispatchToProps = dispatch => ({
  fetchCompletedProjects: token =>
    dispatch(async (dispatch, getState, { network }) => {
      const completedProjects = await requestHandler(
        network.projects.fetchCompletedProjects
      )({ token })
      dispatch(receivedCompletedProjects(completedProjects))
      return Promise.resolve(completedProjects)
    }),
  fetchOngoingProjects: token =>
    dispatch(async (dispatch, getState, { network }) => {
      const ongoingProjects = await requestHandler(
        network.projects.fetchOngoingProjects
      )({ token })
      dispatch(receivedOngoingProjects(ongoingProjects))
      return Promise.resolve(ongoingProjects)
    }),
})

const glueTo = connect(mapStateToProps, mapDispatchToProps)

export default glueTo(Projects)
