import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import Schedule from './Schedule'
import Map from './Map'
import NewEvent from './NewEvent'
import Edit from './Edit'
import EditEvent from './EditEvent'
import { connect } from 'react-redux'

import { Menu, Container, Header } from 'semantic-ui-react'

 class FestivalDetails extends React.Component {
  state = {}
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  currentFestival = () => {
    let id = parseInt(this.props.match.params.id)
    let fest = this.props.festivals.find(f => f.id === id)
    return fest
  }



  render() {
    const { activeItem } = this.state

    return (
      <Container>
      <Header>{
           `${this.currentFestival().name} | ${this.currentFestival().date_from.split("T")[0]} - ${this.currentFestival().date_until.split("T")[0]}`
         }
      </Header>

      <Menu fluid widths={4}>
        <Menu.Item as={Link} to={`/festivals/${this.props.match.params.id}/schedule/`}
          name='schedule'
          active={activeItem === 'schedule'}
          onClick={this.handleItemClick}
        >
        SCHEDULE
        </Menu.Item>

        <Menu.Item as={Link} to={`/festivals/${this.props.match.params.id}/map/`}
          name='map'
          active={activeItem === 'map'}
          onClick={this.handleItemClick}>
          MAP
        </Menu.Item>

        <Menu.Item as={Link} to={`/festivals/${this.props.match.params.id}/new_event/`}
          name='new_event'
          active={activeItem === 'new_event'}
          onClick={this.handleItemClick}
        >
          NEW EVENT
        </Menu.Item>

        <Menu.Item as={Link} to={`/festivals/${this.props.match.params.id}/edit/`}
          name='edit'
          active={activeItem === 'edit'}
          onClick={this.handleItemClick}
        >
          EDIT
        </Menu.Item>
      </Menu>
        <Switch>
          <Route path="/festivals/:id/schedule" component={Schedule}/>
          <Route path="/festivals/:id/map" component={Map}/>
          <Route path="/festivals/:id/new_event" component={NewEvent}/>
          <Route path="/festivals/:id/edit" component={Edit}/>
          <Route path="/festivals/:id/events/:eventId" component={EditEvent}/>
        </Switch>
      </Container>
    )
  }
}

function mapStateToProps(state){
  return {
    festivals: state.festival.festivals,
  }
}

export default connect(mapStateToProps)(FestivalDetails)
