import React, { Component } from "react";
import { Input, Menu, Icon, Label, Dropdown } from "semantic-ui-react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import * as actions from "../../actions/auth";

import "./TopNav.css";

const TopNav = ({user, logout}) => (
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
        name="messages"
      >
        <Icon name="mail" />
        <Label color="red" floating circular size="mini">
          22
            </Label>
          <Dropdown text='' floating>
            <Dropdown.Menu>
              <Dropdown.Item>Important</Dropdown.Item>
              <Dropdown.Item>Announcement</Dropdown.Item>
              <Dropdown.Item>Discussion</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
      </Menu.Item>
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
              <Dropdown.Item>Announcement</Dropdown.Item>
              <Dropdown.Item>Discussion</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
      </Menu.Item>
      <Menu.Item onClick={() => logout()}>
        <Icon name='external' />
      </Menu.Item>
    </Menu.Menu>
  </Menu>
)

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

export default connect(mapStateToProps, {logout: actions.logout })(TopNav)