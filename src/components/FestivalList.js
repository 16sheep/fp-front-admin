import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Image, List, Button, Container, Segment } from 'semantic-ui-react'

import { getFestivals} from '../actions.js'

class FestivalList extends React.Component {

  componentDidMount() {
    this.props.getFestivals(this.props.current_user.id)
  }

  render() {
    return (
      <Segment>
        <Container>
          <h2>My Festivals</h2>
          <List animated verticalAlign="middle">
          {this.props.festivals.map((f) =>
            <List.Item key={`festival-${f.id}`}>
              <Image alt="logo" avatar src={f.logo_img}/>
              <List.Content>
                <Link to={`/festivals/${f.id}/schedule/`} className="button">{f.name}</Link>
              </List.Content>
            </List.Item>)}
          </List>
        </Container>
        </Segment>
     )
  }
}

function mapDispatchToProps(dispatch){
  return {
    getFestivals: (id) =>  getFestivals(dispatch, id)
  }
}

function mapStateToProps(state){
  return {
    festivals: state.festival.festivals,
    current_user: state.session.current_user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FestivalList)
