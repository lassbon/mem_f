import React from 'react';
import { Segment, Image, Grid, Button } from "semantic-ui-react";

const ContReg6 = () => (
  <React.Fragment>
    <Grid textAlign="center" style={{ height: "100%" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Segment>
          <Image
            style={{ marginBottom: 20 }}
            verticalAlign="middle"
            src="http://www.accinigeria.com/wp-content/uploads/2017/10/ACCIHD2-2.png"
          />
          <h3 style={{ background: "#2ECC71", color: "white", padding: 10 }}>
            Your verification was successful!
          </h3>
          <h4>Almost done! Make Payment for Membership Fee</h4>
          <Grid columns="equal">
            <Grid.Column>
              <h4>Membership Fee</h4>
            </Grid.Column>
            <Grid.Column>
              <h4>N250,000</h4>
            </Grid.Column>
          </Grid>
          <Grid columns="equal">
            <Grid.Column>
              <h4>Total</h4>
            </Grid.Column>
            <Grid.Column>
              <h4>N250,000</h4>
            </Grid.Column>
          </Grid>
          <Button className='btn'>Proceed</Button>
        </Segment>
      </Grid.Column>
    </Grid>
  </React.Fragment>
);

export default ContReg6