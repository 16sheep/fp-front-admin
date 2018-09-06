import React from 'react'
import { connect } from 'react-redux'
import { logOut } from '../actions.js'
import { Header, Button } from 'semantic-ui-react'


const TopBar = (props) => {
  return (
    <Header as='h3' block textAlign="right">
    { props.current_user ?
      <Button onClick={props.logOut} >Log out</Button>:null
    }
    </Header>
    )
}

function mapDispatchToProps(dispatch){
  return {
    logOut: () =>{logOut(dispatch)}
  }
}

function mapStateToProps(state){
  return {
    current_user: state.session.current_user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBar)
