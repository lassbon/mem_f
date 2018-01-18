import React from 'react';
import { Grid, Segment, Form, Image, Button } from "semantic-ui-react";
import { Link } from 'react-router-dom';

<<<<<<< HEAD
class ContReg3 extends React.Component {
  state = {
    loading : false,
    rep1 : {
      name : null,
      email : null,
      phone : null,
      regOfApp : null,
      picture : null,
      cv : null
    },
    rep2 : {
      name : null,
      email : null,
      phone : null,
      regOfApp : null,
      picture : null,
      cv : null
    }
  }

  handleChange1 = (e) => {
    this.setState({ 
    rep1 : {...this.state.rep1, [e.target.name]: e.target.value}})
  }

  handleChange2 = (e) => {
    this.setState({ 
    rep2 : {...this.state.rep1, [e.target.name]: e.target.value}})
  }

  submit = () => {
    console.log(this.state)
    this.setState({ loading: true })
    setTimeout(function() { window.location = "/cont4" }, 3000)
  }

  validate = () => {
    // perform validation here
  }

  render(){
    return(
      <Form style={{ width: "70%", margin: "0 auto", textAlign: "center" }}>
        <Image
          style={{ marginBottom: 20, marginTop: 30 }}
          verticalAlign="middle"
          src="http://www.accinigeria.com/wp-content/uploads/2017/10/ACCIHD2-2.png"
        />
        <h2>Company Representatives</h2>
        <Grid columns="equal">
          <Grid.Column>
            <Form.Field loading={this.state.loading}>
              <Form.Input placeholder="Name" name="name" onChange={this.handleChange1}/>
            </Form.Field>
            <Form.Field>
              <Form.Input type="email" placeholder="email" name="email" onChange={this.handleChange1}/>
            </Form.Field>
            <Form.Field>
<<<<<<< Updated upstream
              <Form.Input placeholder="Phone number" name="phone" onChange={this.handleChange1}/>
=======
              <Form.Input
                placeholder="Phone number"
                name="phone"
                onChange={this.handleChange1}
              />
=======
const ContReg3 = () => (
  <React.Fragment>
    <Form style={{ width: "70%", margin: "0 auto", textAlign: "center" }}>
      <Image
        style={{ marginBottom: 20, marginTop: 30 }}
        verticalAlign="middle"
        src="http://www.accinigeria.com/wp-content/uploads/2017/10/ACCIHD2-2.png"
      />
      <h2>Company Representatives</h2>
      <Grid columns="equal">
        <Grid.Column>
          <Form.Field>
            <Form.Input placeholder="Name" />
          </Form.Field>
          <Form.Field>
            <Form.Input type="email" placeholder="email" />
          </Form.Field>
          <Form.Field>
            <Form.Input placeholder="Phone number" />
          </Form.Field>
          <Form.Field>
            <label>
              Upload copy of Certificate of Incorporation or Registration of
              Applicant
            </label>
            <Form.Input type="file" />
          </Form.Field>
          <Form.Field>
            <label>
              Upload Passport Photographs of the Company Representative(s)
            </label>
            <Form.Input type="file" />
          </Form.Field>
          <Form.Field>
            <label>Upload curriculum Vitae of Company Representative(s)</label>
            <Form.Input type="file" />
          </Form.Field>
        </Grid.Column>
        <Grid.Column>
          <Grid.Column>
            <Form.Field>
              <Form.Input placeholder="Name" />
            </Form.Field>
            <Form.Field>
              <Form.Input type="email" placeholder="email" />
            </Form.Field>
            <Form.Field>
              <Form.Input placeholder="Phone number" />
>>>>>>> parent of 13fdae5... Merge pull request #3 from chiefoleka/master
>>>>>>> Stashed changes
            </Form.Field>
            <Form.Field>
              <label>
                Upload copy of Certificate of Incorporation or Registration of
                Applicant
              </label>
<<<<<<< Updated upstream
              <Form.Input type="file" name="regOfApp" onChange={this.handleChange1}/>
=======
<<<<<<< HEAD
              <Form.Input
                type="file"
                name="regOfApp"
                onChange={this.handleChange1}
              />
=======
              <Form.Input type="file" />
>>>>>>> parent of 13fdae5... Merge pull request #3 from chiefoleka/master
>>>>>>> Stashed changes
            </Form.Field>
            <Form.Field>
              <label>
                Upload Passport Photographs of the Company Representative(s)
              </label>
<<<<<<< Updated upstream
              <Form.Input type="file" name="picture" onChange={this.handleChange1}/>
=======
<<<<<<< HEAD
              <Form.Input
                type="file"
                name="picture"
                onChange={this.handleChange1}
              />
>>>>>>> Stashed changes
            </Form.Field>
            <Form.Field>
              <label>Upload curriculum Vitae of Company Representative(s)</label>
              <Form.Input type="file" name="cv" onChange={this.handleChange2}/>
            </Form.Field>
          </Grid.Column>
          <Grid.Column>
            <Form.Field loading={this.state.loading}>
              <Form.Input placeholder="Name" name="name" onChange={this.handleChange2}/>
            </Form.Field>
            <Form.Field>
              <Form.Input type="email" placeholder="email" name="email" onChange={this.handleChange2}/>
            </Form.Field>
            <Form.Field>
              <Form.Input placeholder="Phone number" name="phone" onChange={this.handleChange2}/>
            </Form.Field>
            <Form.Field>
              <label>
                Upload copy of Certificate of Incorporation or Registration of
                Applicant
              </label>
<<<<<<< Updated upstream
              <Form.Input type="file" name="regOfApp" onChange={this.handleChange2}/>
=======
              <Form.Input
                type="file"
                name="regOfApp"
                onChange={this.handleChange2}
              />
=======
              <Form.Input type="file" />
>>>>>>> parent of 13fdae5... Merge pull request #3 from chiefoleka/master
>>>>>>> Stashed changes
            </Form.Field>
            <Form.Field>
              <label>
                Upload curriculum Vitae of Company Representative(s)
              </label>
<<<<<<< Updated upstream
              <Form.Input type="file" name="picture" onChange={this.handleChange2}/>
=======
<<<<<<< HEAD
              <Form.Input
                type="file"
                name="picture"
                onChange={this.handleChange2}
              />
>>>>>>> Stashed changes
            </Form.Field>
            <Form.Field>
              <label>Upload curriculum Vitae of Company Representative(s)</label>
              <Form.Input type="file" name="cv" onChange={this.handleChange2}/>
            </Form.Field>
          </Grid.Column>
        </Grid>
        <div style={{marginTop: 30}}>
          <Button to="/cont2" as={Link}>
            Back
          </Button>
          <Button className='btn' onClick={this.submit}>
            Next
          </Button>
        </div>
      </Form>
    )
  }
}
=======
              <Form.Input type="file" />
            </Form.Field>
          </Grid.Column>
        </Grid.Column>
      </Grid>
      <div style={{marginTop: 30}}>
        <Button to="/cont2" as={Link}>
          Back
        </Button>
        <Button className='btn' to="/cont4" as={Link}>
          Next
        </Button>
      </div>
    </Form>
  </React.Fragment>
);
>>>>>>> parent of 13fdae5... Merge pull request #3 from chiefoleka/master

export default ContReg3