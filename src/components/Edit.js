import React from 'react'
import { editFestival, deleteFestival } from '../actions.js'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Checkbox, Form, Container, Header } from 'semantic-ui-react'


class Edit extends React.Component {
  state = {
    name: "",
    secret: "",
    location: "",
    logo_img: "",
    map_img: "",
    date_from: "",
    date_until: ""
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  currentFestival = () => {
    let id = parseInt(this.props.match.params.id)
    let fest = this.props.festivals.find(f => f.id === id)
    return fest
  }

  componentDidMount () {
    let from = this.currentFestival().date_from.split("T")
    let until = this.currentFestival().date_until.split("T")
    this.setState({
      name: this.currentFestival().name,
      secret: this.currentFestival().secret,
      location: this.currentFestival().location,
      logo_img: this.currentFestival().logo_img,
      map_img: this.currentFestival().map_img,
      date_from: this.currentFestival().from,
      date_until: this.currentFestival().until
    })
  }

  render() {
    return(
      <Container>
      <Header>Update festival details</Header>
      <Form onSubmit={(e, state)=>this.props.editFestival(e, this.state, this.props.current_user, {id:this.currentFestival().id})}>
      <Form.Field>
        <label>Name</label>
        <input type="text" name="name" value={this.state.name} placeholder={this.currentFestival().name} onChange={this.handleChange}/>
      </Form.Field>
      <Form.Field>
        <label>Secret</label>
        <input type="text" name="secret" value={this.state.secret} placeholder={this.currentFestival().secret} onChange={this.handleChange}/>
      </Form.Field>
      <Form.Field>
        <label>Location</label>
        <input type="text" name="location" value={this.state.location} placeholder={this.currentFestival().location} onChange={this.handleChange}/>
      </Form.Field>
      <Form.Field>
        <label>Logo image link</label>
        <input type="text" name="logo_img" value={this.state.logo_img} placeholder={this.currentFestival().logo_img} onChange={this.handleChange}/>
      </Form.Field>
      <Form.Field>
        <label>Map image link</label>
        <input type="text" name="map_img" value={this.state.map_img} placeholder={this.currentFestival().map_img} onChange={this.handleChange}/>
      </Form.Field>
      <Form.Field>
        <label>From</label>
        <input type="date" name="date_from" value={this.state.date_from} placeholder={this.currentFestival().date_from} onChange={this.handleChange}/>
      </Form.Field>
      <Form.Field>
        <label>To</label>
        <input type="date" name="date_until" value={this.state.date_until} placeholder={this.currentFestival().date_until} onChange={this.handleChange}/>
      </Form.Field>
      <Button.Group>
      <Button type='submit'>Update</Button>
      <Link to="/" className="button">
        <Button onClick={() => {
          this.props.deleteFestival(this.props.current_user,{id:this.currentFestival().id} )}}>
          Delete Festival
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
    editFestival: (e, state, current_user, id) => {
      e.preventDefault()
      editFestival(dispatch, {...state, current_user, id})},
    deleteFestival: (current_user, id) => {
      deleteFestival(dispatch, {current_user,id})}
  }
}

function mapStateToProps(state) {
  return {
    festivals: state.festival.festivals,
    current_user: state.session.current_user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit)