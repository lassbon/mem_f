import React from 'react'
import { connect } from 'react-redux'
import {
  Tab,
  Grid,
  Image,
  Label,
  Segment,
  Card,
  Icon,
  Button,
} from 'semantic-ui-react'
import {
  fetchCurrentProjects,
  fetchCompletedProjects,
} from '../actions/projects'
// import { object } from "../../../Library/Caches/typescript/2.6/node_modules/@types/prop-types";
import PaystackComponent from '../components/PaystackComponent'
import './project.css'

class Project extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentproject: this.props.currentProjectList || [],
      completedproject: this.props.completedProjectList || [],
    }
  }

  componentDidMount() {
    this.props.fetchCurrentProjects(this.props.user.token).then(() => {
      this.setState({
        currentproject: this.props.currentProjectList,
      })
    })
    this.props.fetchCompletedProjects(this.props.user.token).then(() => {
      this.setState({
        completedproject: this.props.completedProjectList,
      })
    })
  }

  render() {
    const { user: { email, id } } = this.props

    const currentcount = this.state.currentproject.length
    const completedcount = this.state.completedproject.length
    const projects = this.state.currentproject.map(jobs => (
      <Tab.Pane attached={false}>
        <Card.Group className="TimeLine">
          <Card style={{ width: '100%' }}>
            <Card.Content>
              <Image size="big" src={jobs.banner} />
              <Card.Meta>{jobs.createdAt}</Card.Meta>
              <Card.Description>{jobs.description}</Card.Description>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                {/* <PaystackComponent
                  amount={5000000.0}
                  text="Make payment"
                  variablename="Verfication "
                  class="donate-button"
                  email={email}
                  metadata={{
                    custom_fields: [
                      {
                        display_name: 'Payment For',
                        variable_name: 'donation title',
                        value: `project_${id}`,
                      },
                      {
                        display_name: 'Membership ID',
                        variable_name: 'membership_id',
                        value: id,
                      },
                    ],
                  }}
                  callback={() => {}}
                  // email={user.email}
                  // amount={`${plan.fee}00`}
                  // plan={plan.paystack.data.plan_code}
                  // callback={this.changeToNew}
                /> */}
              </div>
            </Card.Content>
            {/* <Image
                  size="big"
                  src={jobs.banner}
                /> */}
            
          </Card>
        </Card.Group>
      </Tab.Pane>
    ))

    const completed = this.state.completedproject.map(jobs => (
      <Tab.Pane attached={false}>
        <Card.Group className="TimeLine">
          <Card style={{ width: '100%' }}>
            <Card.Content>
              <Image size="big" src={jobs.banner} />
              <Card.Meta>{new Date(jobs.createdAt).toDateString()}</Card.Meta>
              <Card.Description>{jobs.description}</Card.Description>
            </Card.Content>
            
            
          </Card>
        </Card.Group>
      </Tab.Pane>
    ))

    const panes = [
      {
        menuItem: currentcount + ' Ongoing Projects',
        render: () => projects,
      },
      {
        menuItem: completedcount + ' Completed Projects',
        render: () => completed,
      },
    ]
    return (
      <React.Fragment>
        <Grid>
          <div className="bana">PROJECTS</div>
        </Grid>
        <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  currentProjectList: state.projects.currentproject,
  completedProjectList: state.projects.completedproject,
  user: state.user,
})

export default connect(mapStateToProps, {
  fetchCurrentProjects,
  fetchCompletedProjects,
})(Project)
