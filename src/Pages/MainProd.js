import React from 'react';
import { Grid, Image, Card, Comment, Header, Form, Button, Divider } from 'semantic-ui-react'

class MainProd extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Grid>
          <Grid.Row>
            <Grid.Column width={8}>
              <Image style={{width: '100%', height: 'auto'}} src='https://www.newhdwallpapers.in/wp-content/uploads/2015/12/Cute-Little-Girl-with-Bird-HD-Wallpaper.jpg' />
              <p style={{marginTop: 30}}>
                50% off so many categories! 
                If that doesn’t entice you, then we don’t know what will. Make sure to check out 
                the Konga Clearance Sale this Boxing Day! Better be quick though, 
                LIMITED STOCK only! And we mean that, so if you see 
                something you like at a discounted price, buy it! Because if 
                you don’t, someone else will! We have sales on categories such as:Men’s and 
                Women’s Wear, Phones and tablets, Computers and accessories, 
                Home and kitchen, Beauty and makeup and so many more to list here! 
                So if you want to celebrate the New Year in style, 
                why not check out our massive selection of men’s and women’s wear and accessories?</p>
                <Divider horizontal>register</Divider>
                <Button>Book now</Button>
                <Button className="btn btn-reverse">Register</Button>
            </Grid.Column>
            <Grid.Column width={1}></Grid.Column>
            <Grid.Column width={7} style={{ background: '#ffffff'}}>
              <Card>
                <Card.Content header='Details' />
                <Card.Content description>
                  <h4>Starts: </h4>
                  <p>Tue Feb 23 2018</p>
                  <h4>Ends: </h4>
                  <p>Tue Feb 23 2018</p>
                  <h4>Cost: </h4>
                  <p>50%</p>
                </Card.Content>
                <Card.Content extra>
                  <h4>Organizer</h4>
                  <p>Abuja Chamber of commerce and Industry</p>
                  <h4>Venue</h4>
                  <p>Abuja International Trade & Convention Center, Km 8, Umar Yar’Adua Express Way, (Airport Road)</p>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8}>
              <Comment.Group>
                <Header as='h3' dividing>Comments</Header>
                <Comment>
                  <Comment.Avatar src='http://sguru.org/wp-content/uploads/2017/06/88f3ad1ebfdaafca1a719ef480591c91.jpg' />
                  <Comment.Content>
                    <Comment.Author as='a'>Matt</Comment.Author>
                    <Comment.Metadata>
                      <div>Today at 5:42PM</div>
                    </Comment.Metadata>
                    <Comment.Text>How artistic!</Comment.Text>
                  </Comment.Content>
                </Comment>
                <Form reply>
                  <Form.TextArea autoHeight placeholder='comments...' rows={2} />
                  <Button content='comment' labelPosition='left' icon='edit' primary />
                </Form>
              </Comment.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    )
  }
};

export default MainProd