import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'
import {loginUser, getCurrentUser} from './adapter/adapter'
import Authbox from './components/Authbox'
import TopBar from './components/TopBar'
import About from './components/About'
import FestivalDetails from './components/FestivalDetails'
import FestivalForm from './components/FestivalForm'
import FestivalList from './components/FestivalList'
import { connect } from 'react-redux'
import { Button, Container, Grid, Header} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import './App.css';

class App extends Component {

  login = (username, password) => {
    loginUser(username, password).then(this.postAuth)
  }

  currentFestival = () => {
    console.log("PROPS", this.props)
    let id = parseInt(this.props.match.params.id)
    let fest = this.props.festivals.find(f => f.id === id)
    console.log("UR FEST", fest);
    return fest
  }

  componentDidMount() {
    if (localStorage.getItem('token')) {
      let token = localStorage.getItem('token')
      getCurrentUser(token).then(data => {
        if (data.error) {
          this.props.dispatch({type:"LOG_OUT"})
        } else {
            this.props.dispatch({type:"LOG_IN", payload: data})
        }
      })
    }
  }

  render() {
    return (
      <Container className="App" fluid>
      <TopBar />
      <Switch>
        <Route path="/" render={(routerProps) => {
          if (!this.props.current_user){
            return (
                <Grid>
                  <Grid.Column width={4}>
                    <Authbox />
                  </Grid.Column>
                  <Grid.Column width={12}>
                    <About />
                  </Grid.Column>
                </Grid>
              )
            }
            else {
              return(
                <Grid>
                  <Grid.Column width={4}>
                    <Container>
                      <Button><Link to="/newFestival" className="button">Create New Festival</Link></Button>
                      <FestivalList />
                    </Container>
                  </Grid.Column>
                  <Grid.Column width={12}>
                    <Route exact path="/newFestival" component={FestivalForm}/>
                    <Route path="/festivals/:id" component={FestivalDetails}/>
                  </Grid.Column>
                </Grid>
              )
            }
          }
        } />

        </Switch>
        </Container>
    );
  }
}

function mapStateToProps(state){
  console.log(state);
  return {
    current_user: state.session.current_user,
    festivals: state.festival.festivals
  }
}

export default  withRouter(connect(mapStateToProps)(App))
