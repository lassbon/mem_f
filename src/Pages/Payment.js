import React from 'react';
import { Tab, Grid, Image, Label, Segment, Card, Icon, Button } from 'semantic-ui-react';

const panes = [
  {
    menuItem: 'Membership Renewal',
    render: () => (<Tab.Pane attached={false}>
      <Grid>
        <Grid.Column>
          <Segment raised>
            <Label color="orange" ribbon="right">member id (132465789)</Label>
            <Grid>
              <Grid.Row>
                <Grid.Column width="8">
                  <div>
                    <h3>Chukwu Nonso</h3>
                    <p>Member Since<span style={{color: '#34495E', marginLeft: 30}}>19/10/2017</span></p>
                    <p>Last Renewal<span style={{color: '#34495E', marginLeft: 30}}>20/10/2017</span></p>
                  </div>
                </Grid.Column>
                <Grid.Column width="6">
                  <div>
                    <h3 style={{color: 'var(--main-gold)', float: 'right', marginTop: 20}}>Gold Membership Plan</h3>
                </div>
             </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Grid.Column>

      </Grid>
    </Tab.Pane>),
  },
  {
    menuItem: '(1) Total Subscriptions',
    render: () => <Tab.Pane attached={false}>
      <Card fluid style={{textAlign: 'center', padding: 30}}>
        <h3>MEMBERSHIP FEE AUTO-RENEWAL</h3>
        <p>subscribed on 20/09/2017</p>
        <Button style={{background: 'var(--main-gold)', color: 'var(--white)', width: '40%', margin: '0 auto'}}>UNSUBSCRIBE</Button>
      </Card>
    </Tab.Pane>,
  },
];

const Payment = () => (
  <React.Fragment>
    <Grid>
      <div className="bana">
      PAYMENTS
      </div>
    </Grid>
    <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
  </React.Fragment>
);

export default Payment;
