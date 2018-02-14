import React from "react";
import { Button, Icon, Search } from "semantic-ui-react";

function SearchBanner(props) {
  if (!props.warn) {
    return null;
  }

  return <Search placeholder="serach Connections" />;
}

class SearchFriend extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showSearch: false };
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(prevState => ({
      showSearch: !prevState.showSearch
    }));
  }

  render() {
    return (
      <React.Fragment>
        <Button
          onClick={this.handleToggleClick}
          basic
          color="green"
          size="tiny"
        >
          <Icon name="add circle" />Add connections
        </Button>
        <br />
        <br />
        <SearchBanner warn={this.state.showSearch} />
      </React.Fragment>
    );
  }
}

export default SearchFriend;
