import React from 'react'
import { newFestival } from '../actions.js'
import { connect } from 'react-redux'
import { Button, Checkbox, Form, Container, Header } from 'semantic-ui-react'

class FestivalForm extends React.Component {
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

  render() {
    return(
      <Container>
      <Header>Create new festival</Header>
      <Form onSubmit={(e, state)=>this.props.newFestival(e, this.state, this.props.current_user)}>
      <Form.Field>
        <label>Name</label>
        <input type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
      </Form.Field>
      <Form.Field>
        <label>Secret</label>
        <input type="text" name="secret" value={this.state.secret} onChange={this.handleChange}/>
      </Form.Field>
      <Form.Field>
        <label>Location</label>
        <input type="text" name="location" value={this.state.location} onChange={this.handleChange}/>
      </Form.Field>
      <Form.Field>
        <label>Logo image link</label>
        <input type="text" name="logo_img" value={this.state.logo_img} onChange={this.handleChange}/>
      </Form.Field>
      <Form.Field>
        <label>Map image link</label>
        <input type="text" name="map_img" value={this.state.map_img}  onChange={this.handleChange}/>
      </Form.Field>
      <Form.Field>
        <label>From</label>
        <input type="date" name="date_from" value={this.state.date_from} onChange={this.handleChange}/>
      </Form.Field>
      <Form.Field>
        <label>To</label>
        <input type="date" name="date_until" value={this.state.date_until} onChange={this.handleChange}/>
      </Form.Field>
      <Button type='submit'>Add</Button>
      </Form>
    </Container>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    newFestival: (e, state, current_user) => {
      e.preventDefault()
      newFestival(dispatch, {...state, current_user})}
  }
}

function mapStateToProps(state) {
  return {
    current_user: state.session.current_user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FestivalForm)
