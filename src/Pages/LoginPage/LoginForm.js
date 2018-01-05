import React from 'react'
import { Button, Form, Grid, Image, Message } from 'semantic-ui-react';
import validator from 'validator';
import PropTypes from 'prop-types';

import InlineError from '../../components/messages/InlineError';
import './login.css'

class LoginForm extends React.Component{

  state = {
    data: {
      email: '',
      password: ''
    },
    loading: false,
    errors: {}
  }

  onChange = e => 
    this.setState({ 
      data: {...this.state.data, [e.target.name]: e.target.value} 
    })
  
  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({errors})
    if(Object.keys(errors).length === 0) {
      this.props.submit(this.state.data);
    }
  }

  validate = data => {
    const errors = {};
    if(!validator.isEmail(data.email)) errors.email = 'invalid email'
    if(!data.password) errors.password = 'cant be blink'
    return errors
  }

  render(){
    const { data, errors } = this.state
    return (
      <div className='login-form'>
        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 450 }}>

            <Image verticalAlign='middle' src='http://www.accinigeria.com/wp-content/uploads/2017/10/ACCIHD2-2.png' />


            <Form size='large' onSubmit={this.onSubmit} >
              
                <Form.Input error={!!errors.email}
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='E-mail address'
                  name='email'
                  value={data.email}
                  onChange={this.onChange}
                />
                {errors.email && <InlineError text={errors.email} />}
                <Form.Input error={!!errors.password}
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  name='password'
                  value={data.password}
                  onChange={this.onChange}
                />
                {errors.password && <InlineError text={errors.password} />}
                <Button color='teal' fluid size='large'>Login</Button>
              
            </Form>
            <Message>
              New to us? <a href='#'>Sign Up</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired
}

export default LoginForm
