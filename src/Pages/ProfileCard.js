import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { getUserProfile } from "../actions/users";

class ProfileCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      profile: this.props.userProfileDetails || {}
    };
  }

  componentDidMount() {
    this.props.getUserProfile(this.props.userId).then(res => {
      this.setState({
        profile: this.props.userProfileDetails
      })
    })
  }

  render() {
    const { profile } = this.state;
    return (
      <Profile profile={profile} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.user.id,
    userProfileDetails: state.profile.profileDetails
  }
}

export default connect(mapStateToProps, { getUserProfile })(ProfileCard)