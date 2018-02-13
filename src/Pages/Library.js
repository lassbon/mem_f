import React from "react";
import axios from "axios";
import { Grid, Card, Icon, Button, List } from "semantic-ui-react";

const BASEURL = "https://obscure-waters-44612.herokuapp.com/";

const centerText = {
  textAlign: "center"
};

class Library extends React.Component {
  componentDidMount() {
    this.getDocs();
    this.getOneCat();
    console.log(this.getDocs);
  }

  getDocs() {
    axios.get(`${BASEURL}api/v1/knowledgebase/category/`);
  }
  getOneCat() {
    const id = "general";
    axios.get(`${BASEURL}api/v1/knowledgebase/category/${id}`);
  }

  render() {
    return (
      <React.Fragment>
        <Grid>
          <div className="bana library">LIBRARY</div>
          <div className="sub-bana">(120) Library Items</div>
          <Grid.Row>
            <Grid.Column width={5}>
              <List
                divided
                relaxed
                style={{ background: "var(--white)", padding: 15 }}
              >
                <List.Item>
                  <List.Content>
                    <List.Header as="h4">Categories</List.Header>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon
                    name="folder"
                    size="large"
                    verticalAlign="middle"
                  />
                  <List.Content>
                    <List.Header style={{ color: "rgba(10, 1, 1, 0.674)" }}>
                      General
                    </List.Header>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon
                    name="folder"
                    size="large"
                    verticalAlign="middle"
                  />
                  <List.Content>
                    <List.Header
                      as="h5"
                      style={{ color: "rgba(10, 1, 1, 0.674)" }}
                    >
                      Philosophy
                    </List.Header>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon
                    name="folder"
                    size="large"
                    verticalAlign="middle"
                  />
                  <List.Content>
                    <List.Header
                      as="h5"
                      style={{ color: "rgba(10, 1, 1, 0.674)" }}
                    >
                      Science
                    </List.Header>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon
                    name="folder"
                    size="large"
                    verticalAlign="middle"
                  />
                  <List.Content>
                    <List.Header
                      as="h5"
                      style={{ color: "rgba(10, 1, 1, 0.674)" }}
                    >
                      History
                    </List.Header>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon
                    name="folder"
                    size="large"
                    verticalAlign="middle"
                  />
                  <List.Content>
                    <List.Header
                      as="h5"
                      style={{ color: "rgba(10, 1, 1, 0.674)" }}
                    >
                      Business
                    </List.Header>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon
                    name="folder"
                    size="large"
                    verticalAlign="middle"
                  />
                  <List.Content>
                    <List.Header
                      as="h5"
                      style={{ color: "rgba(10, 1, 1, 0.674)" }}
                    >
                      Geography
                    </List.Header>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon
                    name="folder"
                    size="large"
                    verticalAlign="middle"
                  />
                  <List.Content>
                    <List.Header
                      as="h5"
                      style={{ color: "rgba(10, 1, 1, 0.674)" }}
                    >
                      Languages
                    </List.Header>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon
                    name="folder"
                    size="large"
                    verticalAlign="middle"
                  />
                  <List.Content>
                    <List.Header
                      as="h5"
                      style={{ color: "rgba(10, 1, 1, 0.674)" }}
                    >
                      Languages
                    </List.Header>
                  </List.Content>
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={11}>
              <Card style={{ width: "100%" }}>
                <Card.Content header="General" style={centerText} />
                <Card.Content>
                  <Grid>
                    <Grid.Row style={{ margin: "0 auto" }}>
                      <Grid.Column width="5" style={centerText}>
                        <Icon name="file" size="huge" />
                        <p style={{ marginTop: 10 }}>
                          The Interesting Narrative of the Life of Olaudah
                          Equiano
                        </p>
                      </Grid.Column>
                      <Grid.Column width="5" style={centerText}>
                        <Icon name="file" size="huge" />
                        <p style={{ marginTop: 10 }}>
                          The Interesting Narrative of the Life of Olaudah
                          Equiano
                        </p>
                      </Grid.Column>
                      <Grid.Column width="5" style={centerText}>
                        <Icon name="file" size="huge" />
                        <p style={{ marginTop: 10 }}>
                          The Interesting Narrative of the Life of Olaudah
                          Equiano
                        </p>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={5}>
              <List
                divided
                relaxed
                style={{ background: "var(--white)", padding: 15 }}
              >
                <List.Item>
                  <List.Content>
                    <List.Header as="h4">Your Uploads</List.Header>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="file" size="large" verticalAlign="middle" />
                  <List.Content>
                    <List.Header
                      as="h5"
                      style={{ color: "rgba(10, 1, 1, 0.674)" }}
                    >
                      The Interesting Narrative of the Life of Olaudah Equiano
                    </List.Header>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="file" size="large" verticalAlign="middle" />
                  <List.Content>
                    <List.Header
                      as="h5"
                      style={{ color: "rgba(10, 1, 1, 0.674)" }}
                    >
                      The Interesting Narrative of the Life of Olaudah Equiano
                    </List.Header>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="file" size="large" verticalAlign="middle" />
                  <List.Content>
                    <List.Header
                      as="h5"
                      style={{ color: "rgba(10, 1, 1, 0.674)" }}
                    >
                      The Interesting Narrative of the Life of Olaudah Equiano
                    </List.Header>
                  </List.Content>
                </List.Item>
                <Card.Content extra>
                  <Button basic color="green" size="tiny">
                    <Icon name="add circle" />upload to library
                  </Button>
                </Card.Content>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Library;
