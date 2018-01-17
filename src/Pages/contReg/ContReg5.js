import React from 'react';
import { Card, Image, Grid, Button } from "semantic-ui-react";

const ContReg5 = () => (
  <React.Fragment>
    <Grid textAlign="center" style={{ height: "100%" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Card style={{ padding: "20px" }}>
          <Image
            style={{ marginBottom: 20 }}
            verticalAlign="middle"
            src="http://www.accinigeria.com/wp-content/uploads/2017/10/ACCIHD2-2.png"
          />
          <h3>
            (A registration fee is required to cover the cost of the
            verification process)
          </h3>
          <Grid.Column>Registration Fee</Grid.Column>
          <Grid.Column>
            <strong>N20,000</strong>
          </Grid.Column>
          <Button className="btn" style={{ margin: "30px auto" }}>
            Proceed
          </Button>
        </Card>
      </Grid.Column>
    </Grid>
  </React.Fragment>
);

export default ContReg5