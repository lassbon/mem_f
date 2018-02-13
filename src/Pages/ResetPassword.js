import React from "react";
import { Button, Form, Grid, Image } from "semantic-ui-react";
import "./LoginPage/login.css";

export default class RestPassword extends React.Component {
  render() {
    return (
      <React.Fragment>
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
              <Form size="large">
                <Form.Field>
                  <input placeholder="New password" />
                </Form.Field>
                <Form.Field>
                  <input placeholder="confirm password" />
                </Form.Field>

                <Button color="teal" fluid size="large" type="submit">
                  Submit
                </Button>
              </Form>
            </Grid.Column>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}
