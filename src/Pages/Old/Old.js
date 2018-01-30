import React from 'react'
import { Link } from 'react-router-dom'
import RegLayout from '../../components/RegLayout';
import { Container, Header, Form } from 'semantic-ui-react'

class OldMembers extends React.Component {
  render() {
    return(
      <React.Fragment>
        <RegLayout>
          <Container>
            <Form>
              <Form.Input label='Email' type='email' placeholder="email" />
              <Form.Input label='Enter Password' type='password' placeholder="password" />
              <Form.Input label='Confirm Password' type='password' placeholder="confirm password" />
              <Form.Input label='Address' type='text' placeholder="Address" />
              <Form.Input label='Address' type='text' placeholder="Address" />
              <Form.Input label='Buisness Nature' type='text' placeholder="Buisness Nature" />
              <Form.Input label='Buisness Nature' type='text' placeholder="Buisness Nature" />
              <Form.Input label='Certificate of Incoporation' type='file' placeholder="Certificate of Incoporation" />
              <Form.Input label='Pone Number' type='text' placeholder="Pone Number" />
              <Form.Input label='company rep one name' type='text' placeholder="company rep one name" />
              <Form.Input label='company rep one phone' type='text' placeholder="company rep one phone" />
              <Form.Input label='company rep one email' type='email' placeholder="company rep one email" />
              <Form.Input label='company rep two name' type='text' placeholder="company rep two name" />
              <Form.Input label='company rep two phone' type='text' placeholder="company rep two phone" />
              <Form.Input label='company rep two email' type='email' placeholder="company rep two email" />
            </Form>
          </Container>
        </RegLayout>
      </React.Fragment>
    )
  }
}
export default OldMembers