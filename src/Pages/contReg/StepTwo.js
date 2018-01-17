import React from "react";
import { withStyles } from "material-ui/styles";
import Stepper, { Step, StepLabel } from "material-ui/Stepper";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import {
  Container,
  Radio,
  Grid,
  Image,
  Segment,
  Form,
  Checkbox
} from "semantic-ui-react";

import logo from "../../images/ACCIHD-LOGO.png";
import "./cont.css";


const employies = [
    "1 - 10",
    "11 - 20",
    "21 - 40",
    "41 - 80",
    "81 - 100",
    "100 and above"
  ];

const membershipCategories = 
[
    {
        name    : "category A - Gold",
        id      : 1,
        price   : "2,000 - 2,500",
        benefits: "Lorem ipsum, some Long Shii"
    },
    {
        name    : "category B - Silver",
        id      : 2,
        price   : "2,000 - 2,500",
        benefits: "Lorem ipsum, some Long Shii"
    },
    {
        name    : "category C - Bronze",
        id      : 3,
        price   : "2,000 - 2,500",
        benefits: "Lorem ipsum, some Long Shii"
    },
]
  
  const returns = [
    "N100,000 - N500,000",
    "N501,000 - N1,000,000",
    "N1,000,001 - N3,000,000",
    "N3,000,001 - N5,000,000",
    "N5,000,001 - N10,000,000",
    "N100,000,001 and above"
  ];

  const styles = theme => ({
    root: {
      width: "90%"
    },
    backButton: {
      marginRight: theme.spacing.unit
    },
    instructions: {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit
    }
  });


  class stepOnePage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
                        companyName:'',
                        address : '',
                        phoneNumber : '',
                        natureBusiness : '',
                        numberEmployees : '',
                        annualReturns: '',
                        annualProfits: ''
                    };
    }

    handleChange = (key,value) => {
        let newState = {}
        newState[key] = value
        this.setState(newState);
    }
    
    saveData = ()=> console.warn(this);

  
  
  AnualProfits = returns.map(aProfit => (
    <div key={`${aProfit} + ${aProfit}`}>
      <Form.Field>
      <Radio
        label={aProfit}
        name='annualProfit'
        value={aProfit}
        onChange={this.handleChange('annualProfits',aProfit)}
        style={{ marginBottom: 20 }}
      />
    </Form.Field>
    </div>
  ));

  Categories = returns.map((cats,key) => (
      {cats}
  ));
  Test = ({membershipCategories}) => (
    <div>
      {membershipCategories.map(station => (
        <div className="station" key={station.id}>{station.name}</div>
      ))}
    </div>
  ); 
  



      render(){
        const { classes } = this.props;
        
            return (
                <div >
                <Container>
                  <Grid className="home-sec-one">
                    <Grid.Column width={2} />
                    <Grid.Column width={14}>
                      <Image src={logo} alt="acci logo" />
                        <h3 style={{ color: "#656768", textAlign: "center" }}>Membership Category</h3>
                    </Grid.Column>
                    <Grid.Column width={2} />
                    <Grid.Column width={14}>
                    <Segment>
                    <div className={classes.instructions}>
                        {this.Test}
                </div>
                </Segment>
                </Grid.Column>
                </Grid>
                </Container>
                </div>
            );
          
      }
  }

  export default withStyles(styles)(stepOnePage);