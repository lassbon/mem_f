import React from 'react';
import { Grid, Container, Segment, Image, Button} from 'semantic-ui-react';
import {Link} from 'react-router-dom'

import LOGO from '../../images/ACCIHD-LOGO.png'

const WelcomePage = () => (
  <React.Fragment>
    <Container>
      <Grid>
        <Grid.Column computer={10} mobile={16} tablet={10}>
          <Image src={LOGO} alt="acci logo" />
        </Grid.Column>
        <Grid.Column computer={6} mobile={16} tablet={6}>
          <Button><Link to='/login'>Login</Link></Button>
          <Button><Link to='/signup'>signup</Link></Button>
        </Grid.Column>
      </Grid>
    </Container>
  </React.Fragment>
)

export default WelcomePage