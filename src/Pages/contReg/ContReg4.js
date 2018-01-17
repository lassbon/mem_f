import React from "react";
import { Grid, Segment, Form, Image, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const ContReg3 = () => (
  <React.Fragment>
    <Form style={{ width: "70%", margin: "0 auto", textAlign: "center" }}>
      <Image
        style={{ marginBottom: 20, marginTop: 30 }}
        verticalAlign="middle"
        src="http://www.accinigeria.com/wp-content/uploads/2017/10/ACCIHD2-2.png"
      />
      <h2>Please fill member id and email of two financial members</h2>
      <Grid columns="equal">
        <Grid.Column>
          <Form.Field>
            <Form.Input placeholder="membership id" />
          </Form.Field>
          <Form.Field>
            <Form.Input type="email" placeholder="email" />
          </Form.Field>
        </Grid.Column>
        <Grid.Column>
          <Grid.Column>
            <Form.Field>
              <Form.Input placeholder="membership id" />
            </Form.Field>
            <Form.Field>
              <Form.Input type="email" placeholder="email" />
            </Form.Field>
          </Grid.Column>
        </Grid.Column>
      </Grid>
      <div style={{ marginTop: 30 }}>
        <Button to="/cont2" as={Link}>
          Back
        </Button>
        <Button className="btn" to="/cont5" as={Link}>
          Next
        </Button>
      </div>
    </Form>
  </React.Fragment>
);

export default ContReg3;
