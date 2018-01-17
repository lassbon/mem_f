import React from "react";
import {
  Container,
  Grid,
  Image,
  Segment,
  Form,
  Checkbox,
  Button
} from "semantic-ui-react";

import logo from "../../images/ACCIHD-LOGO.png";
import "./cont.css";
import axios from "axios";
import { Link } from "react-router-dom";

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

const ContReg2 = () => (
  <div
    style={{
      width: "70%",
      margin: "0 auto",
      border: "1px solid #C0C0C0",
      height: "100%",
      verticalAlign: "middle",
      marginTop: "100px",
      marginBottom: 100
    }}
  >
    <Image
      style={{ marginBottom: 20, marginLeft: "36%", marginTop: 30 }}
      verticalAlign="middle"
      src="http://www.accinigeria.com/wp-content/uploads/2017/10/ACCIHD2-2.png"
    />
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
      <Button
        as={Link}
        to="/cont2"
        className="btn btn-reverse"
        content="Next"
        style={{ marginLeft: "40%" }}
      />
    </Form>
  </div>
);

export default ContReg2;
