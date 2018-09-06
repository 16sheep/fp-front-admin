import React from 'react'
import { Route, Switch, Redirect} from 'react-router-dom'
import { Link } from 'react-router-dom'
import SignUp from '../auth/SignUp'
import Login from '../auth/Login'


const Authbox = () => {
  return (
    <div className="aside">
      <div>
        <Link to="/signup" className="button">Sign up </Link>
        <Link to="/login" className="button"> Login</Link>
        <Switch>
          <Route exact path="/signup" component={SignUp}/>
          <Route exact path="/login" component={Login}/>
          <Redirect from="/" to="/signup"/>
        </Switch>
      </div>

    </div>
  )
}

export default Authbox
