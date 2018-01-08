import React, { Component } from "react";
import { Menu, Icon } from "semantic-ui-react";
import {Link} from 'react-router-dom';

import Logo from "../../images/ACCIHD-LOGO.png";

import "./Sidebar.css";

export default class SideBar extends Component {
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu pointing secondary vertical fixed="top">
        <div style={{ padding: 10, background: "var(--main-gold)" }}>
          <img src={Logo} alt="" style={{ width: "100%", height: "100%" }} />
        </div>
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={this.handleItemClick}
        >
          <Link to='/home'>Home</Link>
          <Icon name="home" />
        </Menu.Item>
        <Menu.Item
          name="profile"
          active={activeItem === "profile"}
          onClick={this.handleItemClick}
        >
          <Link to='/profile'>Profile</Link>
          <Icon name="user" />
        </Menu.Item>
        <Menu.Item
          name="events"
          active={activeItem === "events"}
          onClick={this.handleItemClick}
        >
          <Link to='/events'>Events</Link>
          <Icon name="calendar" />
        </Menu.Item>
        <Menu.Item
          name="payments"
          active={activeItem === "payments"}
          onClick={this.handleItemClick}
        >
          <Link to='/payment'>Payment</Link>
          <Icon name="payment" />
        </Menu.Item>
        <Menu.Item
          name="discussions"
          active={activeItem === "discussions"}
          onClick={this.handleItemClick}
        >
          <Link to='/discuss'>Discussion</Link>
          <Icon name="comments" />
        </Menu.Item>
        <Menu.Item
          name="projects"
          active={activeItem === "projects"}
          onClick={this.handleItemClick}
        >
          <Link to='/project'>Projects</Link>
          <Icon name="hourglass end" />
        </Menu.Item>
        <Menu.Item
          name="library"
          active={activeItem === "library"}
          onClick={this.handleItemClick}
        >
          <Link to='/library'>Library</Link>
          <Icon name="book" />
        </Menu.Item>
      </Menu>
    );
  }
}
