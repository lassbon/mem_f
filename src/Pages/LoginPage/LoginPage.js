import React from 'react';

import LoginForm from './LoginForm';

export default class LoginPage extends React.Component {

  submit =(data) => console.log(data)

  render() {
    return(
      <LoginForm submit={this.submit} />
    )
  }
};