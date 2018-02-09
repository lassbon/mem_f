import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { oldMem } from "../../actions/auth";
import { Message, Grid, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

import OldmembersForm from "./OldmembersForm";

class OldmembersPage extends React.Component {
  submit = data => this.props.oldMem(data);
  // .then(user => {
  //   const { history } = this.props
  //   const { regState } = user
  //   console.log(regState, registrationStages[regState])
  //   regState > 2
  //     ? history.push('/app')
  //     : history.push(registrationStages[regState])
  //   // this.props.history.push('/app')
  // })

  render() {
    return (
      <div className="login-form">
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
            <OldmembersForm submit={this.submit} />
            <Message>
              New to us?{" "}
              <Link to="/signup" style={{ color: "var(--main-blue)" }}>
                Sign Up
              </Link>
            </Message>

            <Link to="/forgotpassword" style={{ color: "var(--main-blue)" }}>
              forgot password?
            </Link>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

OldmembersPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  oldMem: PropTypes.func.isRequired
};

export default connect(null, { oldMem })(OldmembersPage);
