import React from 'react'
import {Container, Header, Segment} from 'semantic-ui-react'


const About = () => {
  return (
    <Segment>
    <Container>
      <Header>Festival Planner</Header>
      <p>
        Festival planner helps festival organisers manage the event schedule across different venues.
        It syncs with Fest phone app and allows festivalgoers to easily navigate the festival with
        interactive map and event fitlers which helps them find their way around.
      </p>
    </Container>
    </Segment>
  )
}

export default About
