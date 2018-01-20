import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';

class ProfileCard extends React.Component {
  render() {
    const { userProfile } = this.props;
    return (
      <Profile profile={userProfile} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userProfile: state.profile
  }
}

export default connect(mapStateToProps)(ProfileCard);