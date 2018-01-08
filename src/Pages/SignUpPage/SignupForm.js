import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Grid, Image } from "semantic-ui-react";
import isEmail from "validator/lib/isEmail";
import InlineError from "../../components/messages/InlineError";

class SignupForm extends React.Component {
  state = {
    data: {
      company: "",
      address: "",
      phone: "",
      email: "",
      password: "",
      bizNature: "",
      companyRepName1: "",
      companyRepPhone1: "",
      companyRepEmail1: "",
      companyRepName2: "",
      companyRepPhone2: "",
      companyRepEmail2: "",
      referrer1: "",
      referrer2: "",
    },
    loading: false,
    errors: {}
  };

  onChange = e =>
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    console.log(this.state.data);

    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submit(this.state.data)
        .catch((error) => {
          if (error.response) {
            // console.log(error.response.data)
            this.setState({ errors: error.response.data, loading: false })
          }
        });
    }
  };

  validate = data => {
    const errors = {};

    if (!isEmail(data.email)) errors.email = "Invalid email";
    if (!data.password) errors.password = "Can't be blank";
    if (!data.company) errors.company = "please enter company name";
    if (!data.address) errors.address = "please enter address";
    if (!data.bizNature) errors.bizNature = "please enter buisness nature";
    if (!data.companyRepName1) errors.companyRepName1 = "company rep name required";
    if (!data.companyRepName2) errors.companyRepName2 = "company rep name required";
    if (!data.companyRepPhone1) errors.companyRepPhone1 = "company rep phone number required";
    if (!data.companyRepPhone2) errors.companyRepPhone2 = "company rep phone number required";
    if (!isEmail(data.companyRepEmail1)) errors.companyRepEmail1 = "invalid email";
    if (!isEmail(data.companyRepEmail2)) errors.companyRepEmail2 = "invalid email";
    if (!data.referrer1) errors.referrer1 = "please provide referrer";
    if (!data.referrer2) errors.referrer2 = "please provide referrer";

    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;

    return (
      <div className='login-form'>
        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 550 }}>
            <Image style={{ marginBottom: 20 }} verticalAlign='middle' src='http://www.accinigeria.com/wp-content/uploads/2017/10/ACCIHD2-2.png' />
            <Form onSubmit={this.onSubmit}>
              <Form.Field error={!!errors.company}>
                <input
                  type="text"
                  id="company"
                  name="company"
                  placeholder="company name"
                  value={data.company}
                  onChange={this.onChange}
                />
                {errors.company && <InlineError text={errors.company} />}
              </Form.Field>

              <Form.Field error={!!errors.address}>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="address"
                  value={data.address}
                  onChange={this.onChange}
                />
                {errors.address && <InlineError text={errors.address} />}
              </Form.Field>

              <Form.Field error={!!errors.phone}>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="phone number"
                  value={data.phone}
                  onChange={this.onChange}
                />
                {errors.phone && <InlineError text={errors.phone} />}
              </Form.Field>

              <Form.Field error={!!errors.email}>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="email@email.com"
                  value={data.email}
                  onChange={this.onChange}
                />
                {errors.email && <InlineError text={errors.email} />}
              </Form.Field>

              <Form.Field error={!!errors.password}> 
                <input
                  type="password"
                  id="password"
                  placeholder="password"
                  name="password"
                  value={data.password}
                  onChange={this.onChange}
                />
                {errors.password && <InlineError text={errors.password} />}
              </Form.Field>

              <Form.Field error={!!errors.bizNature}>
                <input
                  type="text"
                  id="bizNature"
                  name="bizNature"
                  placeholder="Buisness nature"
                  value={data.bizNature}
                  onChange={this.onChange}
                />
                {errors.bizNature && <InlineError text={errors.bizNature} />}
              </Form.Field>
              <p>Company Representatives</p>
              <Form.Group unstackable widths={2}>
                <Form.Field error={!!errors.companyRepName1}>
                  <label>Name</label>
                  <input
                    type="text"
                    id="companyRepName1"
                    name="companyRepName1"
                    placeholder="name"
                    value={data.companyRepName1}
                    onChange={this.onChange}
                  />
                  {errors.companyRepName1 && <InlineError text={errors.companyRepName1} />}
                </Form.Field>

                <Form.Field error={!!errors.companyRepPhone1}>
                  <label>phone number </label>
                  <input
                    type="text"
                    id="companyRepPhone1"
                    name="companyRepPhone1"
                    placeholder="phone"
                    value={data.companyRepPhone1}
                    onChange={this.onChange}
                  />
                  {errors.companyRepPhone1 && <InlineError text={errors.companyRepPhone1} />}
                </Form.Field>

                <Form.Field error={!!errors.companyRepEmail1}>
                  <label>phone number </label>
                  <input
                    type="email"
                    id="companyRepEmail1"
                    name="companyRepEmail1"
                    placeholder="email"
                    value={data.companyRepEmail1}
                    onChange={this.onChange}
                  />
                  {errors.companyRepEmail1 && <InlineError text={errors.companyRepEmail1} />}
                </Form.Field>
              </Form.Group>

              <Form.Group unstackable widths={2}>
                <Form.Field error={!!errors.companyRepName2}>
                  <label>Name</label>
                  <input
                    type="text"
                    id="companyRepName2"
                    name="companyRepName2"
                    placeholder="name"
                    value={data.companyRepName2}
                    onChange={this.onChange}
                  />
                  {errors.companyRepName2 && <InlineError text={errors.companyRepName2} />}
                </Form.Field>

                <Form.Field error={!!errors.companyRepPhone2}>
                  <label>phone number </label>
                  <input
                    type="text"
                    id="companyRepPhone2"
                    name="companyRepPhone2"
                    placeholder="phone"
                    value={data.companyRepPhone2}
                    onChange={this.onChange}
                  />
                  {errors.companyRepPhone2 && <InlineError text={errors.companyRepPhone2} />}
                </Form.Field>

                <Form.Field error={!!errors.companyRepEmail2}>
                  <label>phone number </label>
                  <input
                    type="email"
                    id="companyRepEmail2"
                    name="companyRepEmail2"
                    placeholder="email"
                    value={data.companyRepEmail2}
                    onChange={this.onChange}
                  />
                  {errors.companyRepEmail2 && <InlineError text={errors.companyRepEmail2} />}
                </Form.Field>
              </Form.Group>
              <p>referrer</p>
              <Form.Field error={!!errors.referrer1}>
                
                <input
                  type="text"
                  id="referrer1"
                  name="referrer1"
                  placeholder="referrer"
                  value={data.referrer1}
                  onChange={this.onChange}
                />
                {errors.referrer1 && <InlineError text={errors.referrer1} />}
              </Form.Field>

              <Form.Field error={!!errors.referrer2}>
                
                <input
                  type="text"
                  id="referrer2"
                  name="referrer2"
                  placeholder="referrer"
                  value={data.referrer2}
                  onChange={this.onChange}
                />
                {errors.referrer2 && <InlineError text={errors.referrer2} />}
              </Form.Field>
              <Button primary>Sign Up</Button>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

SignupForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default SignupForm;
