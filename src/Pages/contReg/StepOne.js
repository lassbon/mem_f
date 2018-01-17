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

    NumOfEmployees = employies.map(num => (
    <div key={`${num} + ${num}`}>
      <Form.Field>
          <Radio
            label={num}
            name='numOfEmp'
            value={num}
            style={{ marginBottom: 20 }}
            onChange={this.handleChange('numberEmployees',num)}
        />
        </Form.Field>
    </div>
  ));
  
    AnualReturns = returns.map(aReturn => (
    <div key={`${aReturn} + ${aReturn}`}>
      {/* <Checkbox radio style={{ marginBottom: 20 }} name='annualReturns' radio label={aReturn} /> */}
      <Form.Field>
          <Radio
            label={aReturn}
            name='annualReturns'
            value={aReturn}
            onChange={this.handleChange('annualReturns',aReturn)}
            style={{ marginBottom: 20 }}
        />
        </Form.Field>
    </div>
  ));
  
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




      render(){
        const { classes } = this.props;
        
            return (
                <div className={['ui', 'segment']}>
                <Container>
                  <Grid className="home-sec-one">
                    <Grid.Column width={2} />
                    <Grid.Column width={14}>
                      <Image src={logo} alt="acci logo" />
                        <h3 style={{ color: "#656768", textAlign: "center" }}>Getting to Know You</h3>
                    </Grid.Column>
                    <Grid.Column width={2} />
                    <Grid.Column width={14}>
                    <Segment>
                    <div className={classes.instructions}>
                        <Form style={{ marginTop: 30 }}>
                            <Form.Field style={{ width: "55%", margin: "10px auto" }}>
                                <input placeholder="Company's Name" />
                            </Form.Field>
                            <Form.Field style={{ width: "55%", margin: "10px auto" }}>
                                <input placeholder="Address" />
                            </Form.Field>
                            <Form.Field style={{ width: "55%", margin: "10px auto" }}>
                                <input placeholder="Phone Number" />
                            </Form.Field>
                            <Form.Field
                                style={{ width: "55%", margin: "10px auto", marginBottom: 50 }}
                            >
                                <input placeholder="Nature of buisness" />
                            </Form.Field>
                            <Grid style={{ width: "90%", margin: "0 auto" }}>
                                <Grid.Column width={5}>
                                <h3 style={{ color: "#656768" }}>Number of Employees</h3>
                                {this.NumOfEmployees}
                                </Grid.Column>
                                <Grid.Column width={6}>
                                <h3 style={{ color: "#656768" }}>Annual Return</h3>
                                {this.AnualReturns}
                                </Grid.Column>
                                <Grid.Column width={5}>
                                <h3 style={{ color: "#656768" }}>Annual Profits</h3>
                                {this.AnualProfits}
                                </Grid.Column>
                                <Button
                                    raised
                                    color="primary"
                                    className="btn"
                                    onClick={this.saveData}
                                    style={{margin:"auto"}}
                                >
                                    Save
                                </Button>
                            </Grid>
                        </Form>
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