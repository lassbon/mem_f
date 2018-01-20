import React from "react";
import { Tab, Grid, Image, Label, Segment, Card, Icon, Button, List, Modal, Form } from "semantic-ui-react";
import { Link } from 'react-router-dom'

const centerText = {
  textAlign: "center"
}

const items = [
  {
    header: 'Abuja Chamber of Commerce and Industry (ACCI) Presents Certificate of Platinum Membership to Dangote Group on Her Special Day, 29th September, 2017',
    description: '120 replies',
    meta: 'By Chukwu Nonso, 17/10/2017',
  },
  {
    header: 'Project Report - May',
    description: '120 replies',
    meta: 'By Chukwu Nonso, 17/10/2017',
  },
  {
    header: 'Project Report - June',
    description: '120 replies',
    meta: 'By Chukwu Nonso, 17/10/2017',
  },
]

class Discussions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      header: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  onSubmit(event) {
    alert('I dey')
    // event.preventDefault();
    // this.props
    //   .userLoginRequest(this.state)
    //   .then(() => this.setState({ isLogged: this.props.isLogged }))
    //   .catch((errorData) => {
    //     this.setState({
    //       error: errorData.response.data
    //     });
    //   });
  }

  state = { open: false }

  show = size => () => this.setState({ size, open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open, size, header, content } = this.state
    const { match } = this.props
    console.log(this.state);

    return(
      <React.Fragment>
        <Grid>
          <div className='bana library'>
            DISCUSSIONS
      </div>
          <div className='sub-bana'>
            (50) Total Discussions
      </div>

        </Grid>
        <Button
          style={{ marginTop: 30, marginLeft: '18vw' }}
          basic color='green'
          size='tiny'
          onClick={this.show('mini')}>
          <Icon name='add circle' />start a conversation
        </Button>
        <Modal size={size} open={open} onClose={this.close}>
          <Modal.Header>Start conversation</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.onSubmit}>
              <Form.Field>
                <Form.Input name='header' onChange={this.onChange}></Form.Input>
              </Form.Field>
              <Form.Field>
                <Form.TextArea name='content' onChange={this.onChange}></Form.TextArea>
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.onSubmit}>Submit</Button>
          </Modal.Actions>
        </Modal>

        <Link to={`${match.path}/maindis`}>
          <Card.Group items={items} />
        </Link>
      </React.Fragment>
    )
  }
}


export default Discussions;
