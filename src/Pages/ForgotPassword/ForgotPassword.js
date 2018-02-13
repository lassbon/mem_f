import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Message, Grid, Image } from "semantic-ui-react";
import ForgotPasswordForm from "./ForgotPasswordForm";
import { resetPasswordRequest } from "../../actions/auth";
import "../LoginPage/login.css";

class ForgotPassword extends React.Component {
  state = {
    success: false
  };

  submit = data =>
    this.props.resetPasswordRequest(
      data,
      this.setState({ success: true })
      // console.log("props", this.props)
    );
  // .then(() => this.setState({ success: true }));

  render() {
    return (
      <div className="login-form">
        {this.state.success ? (
          <Message>Please check your email.</Message>
        ) : (
          <Grid
            textAlign="center"
            style={{ height: "100%" }}
            verticalAlign="middle"
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <Image
                style={{ marginBottom: 20 }}
                verticalAlign="middle"
                src="http://www.accinigeria.com/wp-content/uploads/2017/10/ACCIHD2-2.png"
              />
              <ForgotPasswordForm submit={this.submit} />
            </Grid.Column>
          </Grid>
        )}
      </div>
    );
  }
}

ForgotPassword.propTypes = {
  resetPasswordRequest: PropTypes.func.isRequired
};

export default connect(null, { resetPasswordRequest })(ForgotPassword);
