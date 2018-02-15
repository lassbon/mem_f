import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Message, Icon } from "semantic-ui-react";

class CongratMessage extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <React.Fragment>
        <Message
          style={{
            width: 600,
            background: "var(--main-gold)",
            color: "white",
            margin: "0 auto",
            textAlign: "center"
          }}
        >
          <Icon
            style={{ textAlign: "center", marginTop: 20, marginBottom: 20 }}
            name="checkmark"
            size="big"
          />
          <Message.Header style={{ textAlign: "center" }}>
            <p>Congratulations!!! You are now a member of ACCI.</p>
          </Message.Header>
          <p style={{ textAlign: "center" }}>
            Your Membership ID is
            <h2
              style={{ textDecoration: "underline", color: "var(--main-blue)" }}
            >
              {user.membershipId}
            </h2>
            {/* <Message style={{ background: "var(--main-blue)", color: "#fff" }}>
              <Message.Header>00000</Message.Header>
            </Message> */}
            {/* Your Membership ID is {user.membershipId}. */}
          </p>
          <p style={{ textAlign: "center" }}>
            Your certificate will be presented to you soon.
          </p>
          <Link className="btn" style={{ border: "1px soild white" }} to="/app">
            <b>Continue to Site</b>
          </Link>
        </Message>
      </React.Fragment>
    );
  }
}

export default connect(({ user }) => ({ user }))(CongratMessage);
