import React, { Component } from "react";
import { Input, Menu, Icon, Label } from "semantic-ui-react";

import "./TopNav.css";

export default class TopNav extends Component {
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

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
            name="messages"
            active={activeItem === "messages"}
            onClick={this.handleItemClick}
          >
            <Icon name="mail" />
            <Label color="red" floating circular size="mini">
              22
            </Label>
          </Menu.Item>
          <Menu.Item
            name="friends"
            active={activeItem === "friends"}
            onClick={this.handleItemClick}
          >
            <Icon name="users" />
            <Label color="red" floating circular size="mini">
              22
            </Label>
          </Menu.Item>
          <Menu.Item
            name="notifications"
            active={activeItem === "notifications"}
            onClick={this.handleItemClick}
          >
            <Icon name="bell" />
            <Label color="red" floating circular size="mini">
              22
            </Label>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}
