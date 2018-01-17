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
                        active : {}
                    };
    }

    handleClick = (value) => {
        this.setState({active:value});
        
        console.warn(this);
    }
    


  Categories = membershipCategories.map(
      (key,value) => (
          <div key={key.id} data-benefits = {key.benefits} onClick={this.handleClick.bind(this,key)} className={"category_item"} > 
              {key.name}
          </div>
      )
  )

  getState = () => 
  {
      return this.state || ''
  }
    CategoryDetails = this.getState(
       (key) => ({key})
    )

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
                    <Grid className="home-sec-one">
                    <Grid.Column width={6}>
                        {this.Categories}
                    </Grid.Column>

                    <Grid.Column width={6}>
                        {this.CategoryDetails}
                    </Grid.Column>
                    </Grid>
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