import _ from 'lodash'
import api from '../api'
import React, { Component } from 'react'
import { Search, Grid, Card, Image, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const resultRenderer = ({ title, id, description, image, business }) =>
  title ? (
    <Card key={id}>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="/assets/images/avatar/large/steve.jpg"
        />
        <Card.Header>{title}</Card.Header>
        <Card.Meta>Friends of Elliot</Card.Meta>
        <Card.Description>{description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button basic color="green">
            Add
          </Button>
        </div>
      </Card.Content>
    </Card>
  ) : null

class MainSearch extends Component {
  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.title })
    const { history } = this.props

    history.push({
      pathname: `/app/profile/${result.id}`,
    })
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })
  }

  componentDidMount = () => {
    const { user: { token } } = this.props
    api.fetchUsers(token).then(res => {
      const data = res.data
      console.log(data)
      this.setState({
        results: data.map(user => ({
          title: user.companyName,
          description: user.companyName,
          image: user.profileImage,
          business: user.companyBusiness,
          id: user.id,
        })),
      })
    })
  }

  render() {
    const { isLoading, value, results } = this.state
    console.log('result', results)
    return (
      <Grid>
        <Grid.Column width={16}>
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={this.handleSearchChange}
            results={results}
            value={value}
            resultRenderer={resultRenderer}
            placeholder="search connections"
          />
        </Grid.Column>
      </Grid>
    )
  }
}

export default withRouter(connect(({ user }) => ({ user }), null)(MainSearch))
