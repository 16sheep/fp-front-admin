import React from 'react'
import { validatePassword } from '../helpers.js'
import { signIn } from '../actions.js'
import { connect } from 'react-redux'


class SignUp extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordConf: ""
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    const { username, email, password, passwordConf } = this.state
    console.log(username)
    e.preventDefault()
    validatePassword(password, passwordConf) ?
      this.props.signIn({username, email, password}):
      alert("Password and confirmation don't match")
  }

  render () {
    const { username, email, password, passwordConf } = this.state
    return (
      <form class="ui form" onSubmit={this.handleSubmit}>
        <input name="username" type="text" placeholder="Username" value={username} onChange={this.handleChange}/>
        <input name="email" type="email" placeholder="Email" value={email} onChange={this.handleChange}/>
        <input name="password" type="password" placeholder="password" value={password} onChange={this.handleChange}/>
        <input name="passwordConf" type="password" placeholder="password" value={passwordConf} onChange={this.handleChange}/>
        <input class="ui button" type="submit" value="Sign up"/>
      </form>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    signIn: (userDetails) => signIn(dispatch, userDetails)
  }
}

function mapStateToProps(state){
  return {
    current_user: state.session.current_user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
