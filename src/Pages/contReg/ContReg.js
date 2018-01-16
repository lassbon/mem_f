import React from "react";
import { withStyles } from "material-ui/styles";
import Stepper, { Step, StepLabel } from "material-ui/Stepper";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import {
  Container,
  Grid,
  Image,
  Segment,
  Form,
  Checkbox
} from "semantic-ui-react";

import logo from "../../images/ACCIHD-LOGO.png";
import "./cont.css";
import axios from "axios";

const BASE_URL = "http://localhost:1337";

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

function getSteps() {
  return [
    "Knowing You",
    "Category",
    "Details",
    "Referrals",
    "Reg Payment",
    "Membership Payment"
  ];
}

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

const NumOfEmployees = employies.map(num => (
  <div key={`${num} + ${num}`}>
    <Checkbox style={{ marginBottom: 20 }} radio label={num} />
    <br />
  </div>
));

const AnualReturns = returns.map(aReturn => (
  <div key={`${aReturn} + ${aReturn}`}>
    <Checkbox style={{ marginBottom: 20 }} radio label={aReturn} />
    <br />
  </div>
));

const AnualProfits = returns.map(aProfit => (
  <div key={`${aProfit} + ${aProfit}`}>
    <Checkbox style={{ marginBottom: 20 }} radio label={aProfit} />
    <br />
  </div>
));

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return (
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
              {NumOfEmployees}
            </Grid.Column>
            <Grid.Column width={6}>
              <h3 style={{ color: "#656768" }}>Annual Return</h3>
              {AnualReturns}
            </Grid.Column>
            <Grid.Column width={5}>
              <h3 style={{ color: "#656768" }}>Annual Profits</h3>
              {AnualProfits}
            </Grid.Column>
          </Grid>
        </Form>
      );
    case 1:
      return "What is an ad group anyways?";
    case 2:
      return "This is the bit I really care about!";
    case 3:
      return "This is another!";
    case 4:
      return "This is the one more!";
    case 5:
      return "This is the last";

    default:
      return "Uknown stepIndex";
  }
}

class HorizontalLabelPositionBelowStepper extends React.Component {
  state = {
    activeStep: 0
  };

  handleNext = () => {
    const { activeStep } = this.state;
    axios({
      method: "put",
      url: `${BASE_URL}/api/v1/user`,
      data: this.state
    }).then(
      this.setState({
        activeStep: activeStep + 1
      })
    );
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <Container>
          <Grid className="home-sec-one">
            <Grid.Column width={2} />
            <Grid.Column width={14}>
              <Image src={logo} alt="acci logo" />
            </Grid.Column>
            <Grid.Column width={2} />
            <Grid.Column width={14}>
              <Stepper
                activeStep={activeStep}
                alternativeLabel
                style={{ background: "transparent" }}
              >
                {steps.map(label => {
                  return (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              <Segment>
                {this.state.activeStep === steps.length ? (
                  <div>
                    <Typography className={classes.instructions}>
                      All steps completed - you&quot;re finished
                    </Typography>
                    <Button onClick={this.handleReset}>Reset</Button>
                  </div>
                ) : (
                  <div>
                    <div className={classes.instructions}>
                      {getStepContent(activeStep)}
                    </div>
                    <div style={{ marginLeft: "40%" }}>
                      <Button
                        disabled={activeStep === 0}
                        onClick={this.handleBack}
                        className={classes.backButton}
                      >
                        Back
                      </Button>
                      <Button
                        raised
                        color="primary"
                        className="btn"
                        onClick={this.handleNext}
                      >
                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                      </Button>
                    </div>
                  </div>
                )}
              </Segment>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(HorizontalLabelPositionBelowStepper);
