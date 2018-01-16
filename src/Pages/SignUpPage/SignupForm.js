import React from "react";
import { Button, Form, Grid, Image, Message } from "semantic-ui-react";
import validator from "validator";
import PropTypes from "prop-types";

import InlineError from "../../components/messages/InlineError";
import "../LoginPage/login.css";

class SignupForm extends React.Component {
  state = {
    data: {
      email: "",
      password: "",
      confirmPassword: ""
    },
    loading: false,
    errors: {}
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props.submit(this.state.data).catch(error => {
        if (error.response) {
          // console.log(error.response.data)
          this.setState({ errors: error.response.data, loading: false });
        }
      });
    }
  };

  validate = data => {
    const errors = {};
    if (!validator.isEmail(data.email)) errors.email = "invalid email";
    if (!data.password) errors.password = "please enter a password";
    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;
    return (
      <Form size="large" onSubmit={this.onSubmit} loading={loading}>
        {errors.err && (
          <Message negative>
            <Message.Header>{errors.err}</Message.Header>
          </Message>
        )}
        <Form.Input
          error={!!errors.email}
          fluid
          icon="user"
          iconPosition="left"
          placeholder="E-mail address"
          name="email"
          value={data.email}
          onChange={this.onChange}
        />
        {errors.email && <InlineError text={errors.email} />}
        <Form.Input
          error={!!errors.password}
          fluid
          icon="lock"
          iconPosition="left"
          placeholder="Password"
          type="password"
          name="password"
          value={data.password}
          onChange={this.onChange}
        />
        {errors.password && <InlineError text={errors.password} />}
        <Form.Input
          error={!!errors.password}
          fluid
          icon="lock"
          iconPosition="left"
          placeholder="Confirm Password"
          type="password"
          name="confirmPassword"
          value={data.confirmPassword}
          onChange={this.onChange}
        />
        <Button color="teal" fluid size="large">
          Signup
        </Button>
      </Form>
    );
  }
}

SignupForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default SignupForm;
