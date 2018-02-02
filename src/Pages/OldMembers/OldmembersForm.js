import React from "react";
import validator from 'validator';
import { Button, Form, Message } from "semantic-ui-react";
import InlineError from "../../components/messages/InlineError";
import "../LoginPage/login.css";

class OldmembersForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
        membershipId: "",
        password: "",
      errors: {},
      loading: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate(this.state);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props.submit(this.state)
      // .catch(error => {
      //   if (error.response) {
      //     this.setState({ errors: error.response.data, loading: false });
      //   }
      // });
    }
  }

  validate = data => {
    const errors = {};
    // if (!validator.isEmail(data.email)) errors.email = "invalid email";
    if (!data.membershipId) errors.membershipId = "please enter your membership Id";
    if (!data.password) errors.password = "please enter a password";
    return errors;
  };


  render() {
    const { errors, loading } = this.state;
    return (
      <Form size="large" onSubmit={this.onSubmit} loading={loading}>
        {errors.err && (
          <Message negative>
            <Message.Header>{errors.err}</Message.Header>
          </Message>
        )}
        <Form.Input
          fluid
          icon="user"
          type="text"
          name="membershipId"
          iconPosition="left"
          placeholder="Membership Id"
          value={this.state.membershipId}
          onChange={this.onChange}
        />
        {errors.membershipId && <InlineError text={errors.membershipId} />}

        <Form.Input
          fluid
          icon="lock"
          iconPosition="left"
          placeholder="Password"
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.onChange}
        />
        {errors.password && <InlineError text={errors.password} />}

        <Button color="teal" fluid size="large">
          Login
        </Button>
      </Form>
    );
  }
}

export default OldmembersForm;
