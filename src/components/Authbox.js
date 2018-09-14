import React from 'react'
import { Route, Switch, Redirect} from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Button, Form, Container, Header, Segment} from 'semantic-ui-react'
import SignUp from '../auth/SignUp'
import Login from '../auth/Login'


const Authbox = () => {
  return (
    <Segment>
    <Container>
      <div>
        <Button.Group attached="top">
          <Button>
          <Link to="/signup" className="button">Sign up </Link>
          </Button>
          <Button>
          <Link to="/login" className="button"> Login</Link>
          </Button>
        </Button.Group>
        <Switch>
          <Route exact path="/signup" component={SignUp}/>
          <Route exact path="/login" component={Login}/>
          <Redirect from="/" to="/signup"/>
        </Switch>
      </div>
    </Container>
    </Segment>

  )
}

export default Authbox
