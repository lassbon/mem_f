import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { getUserProfile, getuserActivity } from "../actions/users";

class ProfileCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      profile: this.props.userProfileDetails || {},
      activities: { 'posts': [] }
    };
  }

  componentDidMount() {
    this.props.getUserProfile(this.props.userId).then(res => {
      this.setState({
        profile: this.props.userProfileDetails
      })
    })
    this.props.getuserActivity(this.props.userId).then(res => {
      this.setState({
        activities: this.props.useractivities
      })
    })
  }

  render() {
    const { profile } = this.state;
    const { activities } = this.state;
    return (
      <Profile
        profile={profile}
        activities={activities}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.user.id,
    userProfileDetails: state.profile.profileDetails,
    useractivities: state.profile.userActivity
  }
}

export default connect(mapStateToProps, { getUserProfile, getuserActivity })(ProfileCard)