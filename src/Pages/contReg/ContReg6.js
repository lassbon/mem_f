import React from 'react';
import { Segment, Image, Grid, Button } from "semantic-ui-react";
import PaystackComponent from "../../components/PaystackComponent";
import { userLoggedIn } from '../../actions/auth'
import axios from 'axios';
import { connect } from 'react-redux'

class ContReg6 extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};
    this.changeToNew = this.changeToNew.bind(this)
  }

  changeToNew(){
    const { history, location: { state: { id } }, userLoggedIn } = this.props;
    let token = axios.defaults.headers.common.authorization;
    if(token !== null){
      userLoggedIn({ token: token });
      localStorage.acciJWT = token;
      history.push({
        pathname: "/app"
      });
    }
    
  }

  render(){
    const { location: { state }, history } = this.props
    console.log(this.props)
    if (state == null || state.id == null) {
      history.push('/signup')
      return null
    }
    
    return (
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
              <PaystackComponent variablename="Verfication " amount="25000000" callback={this.changeToNew} />
            </Segment>
          </Grid.Column>
        </Grid>
      </React.Fragment>
    );
  }
}

export default connect(null, {userLoggedIn})(ContReg6)