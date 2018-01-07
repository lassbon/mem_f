import React from 'react';
import { Grid, Container, Segment, Image} from 'semantic-ui-react';
import LOGO from '../../images/ACCIHD-LOGO.png'

const WelcomePage = () => (
  <React.Fragment>
    <Container>
      <Grid>
        <Grid.Column computer={10} mobile={16} tablet={10}>
          <Image src={LOGO} alt="acci logo" />
        </Grid.Column>
        <Grid.Column computer={6} mobile={16} tablet={6}>
          <Segment>Content</Segment>
        </Grid.Column>
      </Grid>
    </Container>
  </React.Fragment>
)

export default WelcomePage