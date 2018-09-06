import React from 'react'
import { editEvent, deleteEvent, getAreas} from '../actions.js'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Checkbox, Form, Container, Header, Dropdown } from 'semantic-ui-react'


class EditEvent extends React.Component {
  state = {
    name: "",
    description: "",
    date_from: "",
    date_until: "",
    time_from: "",
    time_until: "",
    area_id: "",
    event_manager: this.props.current_user.id
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSelect = (target, {value}) => {
    this.setState({
      area_id: value
    })
  }

  currentFestival = () => {
    let id = parseInt(this.props.match.params.id)
    let fest = this.props.festivals.find(f => f.id === id)
    return fest
  }

  currentEvent = () => {
    let id = parseInt(this.props.match.params.eventId)
    let event = this.props.events.find(e => e.id === id)
    return event
  }

  componentDidMount () {
    let from = this.currentEvent().start.split(" ")
    let until = this.currentEvent().end.split(" ")

    this.setState({
      name: this.currentEvent().name,
      description: this.currentEvent().description,
      area_id: this.currentEvent().area_id,
      time_from: from[1],
      time_until: until[1],
      date_from: from[0],
      date_until: until[0]
    })
  }

  render() {
    let areaOptions = this.props.areas.map((a) => {
      console.log("areaoptionobject",{text: a.name, value: a.id})
      return {text: a.name, value: a.id}
    })
    return(
      <Container>
      <Header>Update Event</Header>
      <Form onSubmit={(e, state)=>this.props.editEvent(e, this.state, this.props.current_user, this.currentFestival().id, this.currentEvent().id)}>
      <Form.Field>
        <label>Name</label>
        <input type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
      </Form.Field>
      <Form.Field>
        <label>Description</label>
        <input type="text" name="description" value={this.state.description} onChange={this.handleChange}/>
      </Form.Field>
      <Form.Field>
        <label>From</label>
        <input required type="date" name="date_from" value={this.state.date_from} onChange={this.handleChange}/>
        <input required type="time" name="time_from" value={this.state.time_from} onChange={this.handleChange}/>
      </Form.Field>
      <Form.Field>
        <label>Until</label>
        <input required type="date" name="date_until" value={this.state.date_until} onChange={this.handleChange}/>
        <input required type="time" name="time_until" value={this.state.time_until}  onChange={this.handleChange}/>
      </Form.Field>
      <Dropdown name="area_id" placeholder='Select Area' fluid selection options={areaOptions}  onChange={this.handleSelect}/>
      <Button.Group>
      <Button type='submit'>Update Event</Button>
      <Link to={`/festivals/${this.currentFestival().id}`} className="button">
        <Button onClick={() => {
          this.props.deleteEvent(this.props.current_user,this.currentFestival().id,this.currentEvent().id )}}>
          Delete Event
        </Button>
      </Link>
      </Button.Group>
      </Form>
    </Container>


    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    editEvent: (e, state, current_user, festival_id, event_id) => {
      e.preventDefault()
      editEvent(dispatch, {...state, current_user, festival_id, event_id}
    )},
    deleteEvent: (current_user,festival_id, event_id) => {
      deleteEvent(dispatch, {current_user,festival_id, event_id})},
    getAreas: (id) => {getAreas(dispatch, id)}
  }
}

function mapStateToProps(state) {
  return {
    areas: state.area.areas,
    events: state.event.events,
    festivals: state.festival.festivals,
    current_user: state.session.current_user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEvent)
