import React from "react";
import { Button, Form } from "semantic-ui-react";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
      // passwordConfirmation: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props.submit(this.state.data).catch(error => {
        if (error.response) {
          this.setState({ errors: error.response.data, loading: false });
        }
      });
    }
  }


  render() {
    return (
      <Form size="large" onSubmit={this.onSubmit}>
        <Form.Input
          fluid
          icon="user"
          type="email"
          name="email"
          iconPosition="left"
          placeholder="E-mail address"
          value={this.state.email}
          onChange={this.onChange}
        />
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
        {/* <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Retype Password"
            type="password"
            name="password"
            value={this.state.passwordConfirmation}
            onChange={this.onChange}
          /> */}

        <Button color="teal" fluid size="large">
          Login
        </Button>
      </Form>
    );
  }
}

export default LoginForm;
