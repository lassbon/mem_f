import React from "react";
import { Grid, Segment, Form, Image, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

class ContReg4 extends React.Component {
  state = {
    loading: false,
    rep1: {
      id: null,
      email: null
    },
    rep2: {
      id: null,
      email: null
    }
  }

  handleChange1 = (e) => {
    this.setState({
      rep1: { ...this.state.rep1, [e.target.name]: e.target.value }
    })
  }

  handleChange2 = (e) => {
    this.setState({
      rep2: { ...this.state.rep1, [e.target.name]: e.target.value }
    })
  }

  submit = () => {
    console.log(this.state)
    this.setState({ loading: true })
    setTimeout(function () { window.location = "/cont5" }, 3000)
  }

  validate = () => {
    // perform validation here
  }

  render() {
    return (
      <Form style={{ width: "70%", margin: "0 auto", textAlign: "center" }} loading={this.state.loading}>
        <Image
          style={{ marginBottom: 20, marginTop: 30 }}
          verticalAlign="middle"
          src="http://www.accinigeria.com/wp-content/uploads/2017/10/ACCIHD2-2.png"
        />
        <h2>Please fill member id and email of two financial members</h2>
        <Grid columns="equal">
          <Grid.Column>
            <Form.Field>
              <Form.Input placeholder="membership id" name="id" onChange={this.handleChange1} />
            </Form.Field>
            <Form.Field>
              <Form.Input type="email" placeholder="email" name="email" onChange={this.handleChange1} />
            </Form.Field>
          </Grid.Column>
          <Grid.Column>
            <Grid.Column>
              <Form.Field>
                <Form.Input placeholder="membership id" name="id" onChange={this.handleChange2} />
              </Form.Field>
              <Form.Field>
                <Form.Input type="email" placeholder="email" name="email" onChange={this.handleChange2} />
              </Form.Field>
            </Grid.Column>
          </Grid.Column>
        </Grid>
        <div style={{ marginTop: 30 }}>
          <Button to="/cont2" as={Link}>
            Back
          </Button>
          <Button className="btn" onClick={this.submit}>
            Next
          </Button>
        </div>
      </Form>
    )
  }
}

export default ContReg4;