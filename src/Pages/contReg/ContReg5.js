import React from 'react';
import { Card, Image, Grid, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import PaystackComponent from '../../components/PaystackComponent'

class ContReg5 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.changeToNew = this.changeToNew.bind(this)
  }

  changeToNew() {
    const { history, location: { state: { id } } } = this.props;
    history.push({
      pathname: '/cont6',
      state: {
        id: id
      }
    });

  }

  render(){
    const { location: { state }, history } = this.props
    console.log(this.props)
    if (state == null || state.id == null) {
      history.push('/signup')
      return null
    }
    
    return(
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
          <PaystackComponent variablename="Verfication " amount="2000000" callback={this.changeToNew} />
          <Button
            className="btn"
            style={{ margin: "30px auto" }}
            to="/cont6"
            as={Link}
          >
            Proceed
          </Button>
        </Card>
      </Grid.Column>
    </Grid>
  </React.Fragment>
);

  }
}
export default ContReg5