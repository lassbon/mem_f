import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { getUserProfile, getuserActivity, getuserFriends } from "../actions/users";
import { 
  getUserDonations,
  getUserEvents,
  getUserMemberships,
  getUserTrainings
} from "../actions/payments";

class ProfileCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      profile: this.props.userProfileDetails || {},
      activities: { 'posts': [] },
      friends: { 'friends': [] },
      donations: {'donations': [] },
      events: { 'events': [] },
      memberships: { 'memberships': [] },
      trainings: { 'trainings': [] }
    };
    this.getTransactionHistory = this.getTransactionHistory.bind(this)
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
    this.getTransactionHistory()
  }

  getTransactionHistory() {
    this.props.getUserDonations(this.props.userId).then(res => {
      this.setState({
        donations: this.props.userDonations
      })
    })
    this.props.getUserEvents(this.props.userId).then(res => {
      this.setState({
        events: this.props.userEvents
      })
    })
    this.props.getUserTrainings(this.props.userId).then(res => {
      this.setState({
        trainings: this.props.userTrainings
      })
    })
    this.props.getUserMemberships(this.props.userId).then(res => {
      this.setState({
        memberships: this.props.userMemberships
      })
    })
  }

  render() {
    const { profile, activities, friends, donations, memberships, trainings, events  } = this.state;
    console.log('mayowa', this.state)
    return (
      <Profile
        getTransactionHistory={this.getTransactionHistory}
        profile={profile}
        friends={friends}
        donations={donations}
        memberships={memberships}
        trainings={trainings}
        events={events}
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
    userDonations: state.payments.donations,
    userEvents: state.payments.events,
    userMemberships: state.payments.memberships,
    userTrainings: state.payments.trainings,
  }
}

export default connect(mapStateToProps, { getUserProfile,
  getuserActivity,
  getuserFriends,
  getUserDonations,
  getUserEvents,
  getUserMemberships,
  getUserTrainings
})(ProfileCard)