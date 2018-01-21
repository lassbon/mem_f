import React, { Component } from "react";
import { Input, Menu, Icon, Label, Dropdown } from "semantic-ui-react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import axios from 'axios'
import { logout } from "../../actions/auth";

import "./TopNav.css";
const BASEURL = 'https://2968008f.ngrok.io'

class TopNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notifications : {},
      friends : {}
    }
  }
  render() {
    let notification = this.state.notifications
    const notifs = Object.keys(notification)
                    .map((key) =>(
                      <Dropdown.Item key={key}>`${notifs[key].message} from ${notifs[key].from}`</Dropdown.Item>
                    ))
    return (
      <Menu fixed="top" secondary className="top-menu">
        <Menu.Item>
          <Input
            icon="search"
            placeholder="find a member or project..."
            className="search-box"
          />
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item
            name="friends"
            onClick={this.handleItemClick}
          >
            <Icon name="users" />
            <Label color="red" floating circular size="mini" >
              22
                </Label>
          </Menu.Item>
          <Menu.Item
            name="notifications"
          >
            <Icon name="bell" />
            <Label color="red" floating circular size="mini">
              22
                </Label>
                <Dropdown text='' floating>
                <Dropdown.Menu>
                  <Dropdown.Item>Important</Dropdown.Item>
                  {notifs}
                </Dropdown.Menu>
              </Dropdown>
          </Menu.Item>
          <Menu.Item onClick={() => this.props.logout()}>
            <Icon name='external' />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
  componentDidMount() {
    this.fetchNotifications()
    this.fetchFriends()
    console.log(this.state)
  }
  fetchNotifications = () => {
    let url = `${BASEURL}/api/v1/notifications`
    this.fetchApi(url)
      .then(function(arr){
        this.state.notifications = arr
      }.bind(this))
  }
  fetchFriends = () => {
    let url = `${BASEURL}/api/v1/social/requests/${this.props.user.id}`
    this.fetchApi(url)
      .then(function(arr){
        this.state.friends = arr
      }.bind(this))
  }
  fetchApi = url => {
    return axios.get(url, {
              headers: {
                'Content-Type': 'application/form-data',
                Accept: 'application/form-data',
              },
            })
  }
}

TopNav.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired
  }).isRequired,
  logout: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { logout })(TopNav)