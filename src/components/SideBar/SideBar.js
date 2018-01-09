import React, { Component } from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Link, withRouter} from 'react-router-dom';

import Logo from "../../images/ACCIHD-LOGO.png";

import "./Sidebar.css";
const SideBar = ({match}) => (
  <Menu pointing secondary vertical fixed="top">
    <div style={{ padding: 10, background: "var(--main-gold)" }}>
      <img src={Logo} alt="" style={{ width: "100%", height: "100%" }} />
    </div>
    <Menu.Item
      to={`${match.path}`}
      as={Link}
    > Home
          <Icon name="home" />
    </Menu.Item>
    <Menu.Item
      to={`${match.path}/profile`}
      as={Link}
    >Profile

          <Icon name="user" />
    </Menu.Item>
    <Menu.Item
      to={`${match.path}/events`}
      as={Link}
    >Events

          <Icon name="calendar" />
    </Menu.Item>
    <Menu.Item
      to={`${match.path}/payment`}
      as={Link}
    >Payment

          <Icon name="payment" />
    </Menu.Item>
    <Menu.Item
      to={`${match.path}/discuss`}
      as={Link}
    >Discussion

          <Icon name="comments" />
    </Menu.Item>
    <Menu.Item
      as={Link}
      to={`${match.path}/project`}
    >Projects

          <Icon name="hourglass end" />
    </Menu.Item>
    <Menu.Item
      as={Link}
      to={`${match.path}/library`}
    >Library

          <Icon name="book" />
    </Menu.Item>
  </Menu>
)
      

export default withRouter(SideBar)