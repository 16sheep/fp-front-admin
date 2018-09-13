import React from 'react'
import { newEvent, getAreas} from '../actions.js'
import { connect } from 'react-redux'
import { Button, Checkbox, Form, Container, Header, Dropdown } from 'semantic-ui-react'
import moment from 'moment'



class NewEvent extends React.Component {
  state = {
    name: "",
    description: "",
    category: "",
    date_from: "",
    date_until: "",
    time_from: "",
    time_until: "",
    area_id: "",
    event_manager: this.props.current_user.id,
    time_zone: moment().format("Z")
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSelect = (target, {value}) => {;
    this.setState({
      area_id: value
    })
  }

  componentDidMount() {
    this.props.getAreas(this.props.match.params.id)
  }

  currentFestival = () => {
    let id = parseInt(this.props.match.params.id)
    let fest = this.props.festivals.find(f => f.id === id)
    return fest
  }

  render() {
    let areaOptions = this.props.areas.map((a) => {
      return {text: a.name, value: a.id}
    })
    return(
      <Container>
      <Header>Add new event</Header>
      <Form onSubmit={(e, state)=>{
        this.props.newEvent(e, this.state, this.props.current_user, this.currentFestival().id)
        this.props.history.push(`/festivals/${this.currentFestival().id}/schedule`)
      }}>
      <Form.Field>
        <label>Name</label>
        <input required type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
      </Form.Field>
      <Form.Field>
        <label>Description</label>
        <input required type="text" name="description" value={this.state.description} onChange={this.handleChange}/>
      </Form.Field>
      <Form.Field>
        <label>Type</label>
        <input required type="text" name="category" value={this.state.category} onChange={this.handleChange}/>
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
      <Dropdown required name="area_id" placeholder='Select Area' fluid selection options={areaOptions}  onChange={this.handleSelect}/>
      <Button type='submit'>Add Event</Button>
      </Form>
    </Container>
    )
  }
}


function mapDispatchToProps(dispatch){
  return {
    newEvent: (e, state, current_user, festival_id) => {
      e.preventDefault()
      newEvent(dispatch, {...state, current_user, festival_id}
    )},
    getAreas:(id) => {getAreas(dispatch, id)}
  }
}

function mapStateToProps(state) {
  return {
    areas: state.area.areas,
    festivals: state.festival.festivals,
    current_user: state.session.current_user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewEvent)
