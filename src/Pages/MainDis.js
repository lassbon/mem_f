import React from "react";
import { Tab, Grid, Image, Label, Segment, Card, Icon, Button, List, Modal, Form } from "semantic-ui-react";

const centerText = {
  textAlign: "center"
}

const items = [
  {
    header: `Abuja Chamber of Commerce and Industry (ACCI) 
            Presents Certificate of Platinum Membership to Dangote Group on 
            Her Special Day, 29th September, 2017`,
    description: `It is a long established fact that a reader 
                  will be distracted by the readable content of a page when looking at 
                  its layout. The point of using Lorem Ipsum is that it has a more-or-less 
                  normal distribution of letters, as opposed to using 'Content here, 
                  content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).`,
    meta: 'By Chukwu Nonso, 17/10/2017',
  }
]


class Discussions extends React.Component {

  render() {
    return (
      <React.Fragment>
        <Grid>
          <div className='bana library'>
            DISCUSSIONS
          </div>

        </Grid>
       

        <Card.Group items={items} />
      </React.Fragment>
    )
  }
}


export default Discussions;
