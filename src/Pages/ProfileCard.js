import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { getUserProfile, getuserActivity, getuserFriends } from "../actions/users";

class ProfileCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      profile: this.props.userProfileDetails || {},
      activities: { 'posts': [] },
      friends: { 'friends': []}
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
    this.props.getuserFriends(this.props.userId).then(res => {
      this.setState({
        friends: this.props.userfriends
      })
    })
  }

  render() {
    const { profile } = this.state;
    const { activities } = this.state;
    const { friends } = this.state;
    console.log('my syatee', this.state)
    return (
      <Profile
        profile={profile}
        friends={friends}
        activities={activities}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.user.id,
    userProfileDetails: state.profile.profileDetails,
    useractivities: state.profile.userActivity,
    userfriends: state.profile.userFriends,
  }
}

export default connect(mapStateToProps, { getUserProfile, getuserActivity, getuserFriends })(ProfileCard)