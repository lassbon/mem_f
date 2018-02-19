import React, { Component } from 'react'
import { Menu, Icon, Button } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
// import Logo from '../../images/ACCIHD-LOGO.png'
import './Sidebar.css'

class SideBar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Menu pointing secondary vertical fixed="top">
        <div style={{ padding: 10, background: 'var(--main-gold)' }}>
          <img
            src="/images/ACCIHD-LOGO.png"
            alt=""
            style={{ width: '80%', height: '100%' }}
          />
        </div>
        <Menu.Item
          to={`${this.props.match.path}`}
          as={Link}
          style={{ marginTop: 15 }}
        >
          {' '}
          Home
          <Icon name="home" />
        </Menu.Item>
        <Menu.Item to={`${this.props.match.path}/profile`} as={Link}>
          Profile
          <Icon name="user" />
        </Menu.Item>
        <Menu.Item to={`${this.props.match.path}/events`} as={Link}>
          Events
          <Icon name="calendar" />
        </Menu.Item>
        <Menu.Item to={`${this.props.match.path}/payment`} as={Link}>
          Payment
          <Icon name="payment" />
        </Menu.Item>
        <Menu.Item to={`${this.props.match.path}/discuss`} as={Link}>
          Discussion
          <Icon name="comments" />
        </Menu.Item>
        <Menu.Item as={Link} to={`${this.props.match.path}/project`}>
          Projects
          <Icon name="hourglass end" />
        </Menu.Item>
        <Menu.Item as={Link} to={`${this.props.match.path}/library`}>
          Library
          <Icon name="book" />
        </Menu.Item>
        {/* <Button className="btn btn-reverse" style={{marginTop: 100}}>Logout</Button> */}
      </Menu>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.id,
  }
}
export default connect(mapStateToProps, {})(SideBar)
