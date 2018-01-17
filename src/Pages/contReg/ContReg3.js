import React from 'react';
import { Grid, Segment, Form, Image, Button } from "semantic-ui-react";
import { Link } from 'react-router-dom';

const ContReg3 = () => (
  <React.Fragment>
    <Form style={{ width: "70%", margin: "0 auto", textAlign: "center" }}>
      <Image
        style={{ marginBottom: 20, marginTop: 30 }}
        verticalAlign="middle"
        src="http://www.accinigeria.com/wp-content/uploads/2017/10/ACCIHD2-2.png"
      />
      <h2>Company Representatives</h2>
      <Grid columns="equal">
        <Grid.Column>
          <Form.Field>
            <Form.Input placeholder="Name" />
          </Form.Field>
          <Form.Field>
            <Form.Input type="email" placeholder="email" />
          </Form.Field>
          <Form.Field>
            <Form.Input placeholder="Phone number" />
          </Form.Field>
          <Form.Field>
            <label>
              Upload copy of Certificate of Incorporation or Registration of
              Applicant
            </label>
            <Form.Input type="file" />
          </Form.Field>
          <Form.Field>
            <label>
              Upload Passport Photographs of the Company Representative(s)
            </label>
            <Form.Input type="file" />
          </Form.Field>
          <Form.Field>
            <label>Upload curriculum Vitae of Company Representative(s)</label>
            <Form.Input type="file" />
          </Form.Field>
        </Grid.Column>
        <Grid.Column>
          <Grid.Column>
            <Form.Field>
              <Form.Input placeholder="Name" />
            </Form.Field>
            <Form.Field>
              <Form.Input type="email" placeholder="email" />
            </Form.Field>
            <Form.Field>
              <Form.Input placeholder="Phone number" />
            </Form.Field>
            <Form.Field>
              <label>
                Upload copy of Certificate of Incorporation or Registration of
                Applicant
              </label>
              <Form.Input type="file" />
            </Form.Field>
            <Form.Field>
              <label>
                Upload Passport Photographs of the Company Representative(s)
              </label>
              <Form.Input type="file" />
            </Form.Field>
            <Form.Field>
              <label>
                Upload curriculum Vitae of Company Representative(s)
              </label>
              <Form.Input type="file" />
            </Form.Field>
          </Grid.Column>
        </Grid.Column>
      </Grid>
      <div style={{marginTop: 30}}>
        <Button to="/cont2" as={Link}>
          Back
        </Button>
        <Button className='btn' to="/cont4" as={Link}>
          Next
        </Button>
      </div>
    </Form>
  </React.Fragment>
);

export default ContReg3