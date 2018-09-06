import React from 'react'
import { logIn } from '../actions.js'
import { connect } from 'react-redux'

class Login extends React.Component {
  state = {
    username: "",
    password: ""
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { username, password} = this.state
    this.props.logIn({username, password})
  }

  render () {
    const {username, password} = this.state
    return (
      <form class="ui form" onSubmit={this.handleSubmit}>
        <input name="username" type="text" placeholder="Username" value={username} onChange={this.handleChange}/>
        <input name="password" type="password" placeholder="password" value={password} onChange={this.handleChange}/>
        <input class="ui button" type="submit" value="Login"/>
      </form>
    )
  }
}
function mapDispatchToProps(dispatch){
  return {
    logIn: (userDetails) => logIn(dispatch, userDetails)
  }
}

function mapStateToProps(state){
  return {
    current_user: state.session.current_user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
