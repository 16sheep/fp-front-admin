import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import Schedule from './Schedule'
import Map from './Map'
import NewEvent from './NewEvent'
import Edit from './Edit'
import EditEvent from './EditEvent'
import { Menu, Container } from 'semantic-ui-react'

export default class MenuExampleBasic extends React.Component {
  state = {}
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Container>
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

// const FestivalDetails = ({match}) => {
//
//   return (
//     <div>
//       <Link to={`/festivals/${match.params.id}/schedule/`} className="button"><button class="ui button">SCHEDULE</button></Link>
//       <Link to={`/festivals/${match.params.id}/map/`} className="button"><button class="ui button">MAP</button></Link>
//       <Link to={`/festivals/${match.params.id}/new_event/`} className="button"><button class="ui button">NEW EVENT</button></Link>
//       <Link to={`/festivals/${match.params.id}/edit/`} className="button"><button class="ui button">EDIT</button></Link>
//       <Switch>
//         <Route path="/festivals/:id/schedule" component={Schedule}/>
//         <Route path="/festivals/:id/map" component={Map}/>
//         <Route path="/festivals/:id/new_event" component={NewEvent}/>
//         <Route path="/festivals/:id/edit" component={Edit}/>
//         <Route path="/festivals/:id/events/:eventId" component={EditEvent}/>
//       </Switch>
//     </div>
//   )
// }
//
//
// export default FestivalDetails
