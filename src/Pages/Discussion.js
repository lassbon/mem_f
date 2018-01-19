import React from "react";
import { Tab, Grid, Image, Label, Segment, Card, Icon, Button, List, Modal, Form } from "semantic-ui-react";

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
  state = { open: false }

  show = size => () => this.setState({ size, open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open, size } = this.state
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
          <Icon name='add circle' />s
      tart a conversation
    </Button>
        <Modal size={size} open={open} onClose={this.close}>
          <Modal.Header>Start conversation</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field>
                <Form.Input></Form.Input>
              </Form.Field>
              <Form.Field>
                <Form.TextArea></Form.TextArea>
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button>hdh</Button>
          </Modal.Actions>
        </Modal>

        <Card.Group items={items} />
      </React.Fragment>
    )
  }
}


export default Discussions;
