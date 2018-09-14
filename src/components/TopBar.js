import React from 'react'
import { connect } from 'react-redux'
import { logOut } from '../actions.js'
import { Header, Button, Container, Modal, Icon, Grid, Image, Reveal, Segment, List, ListItem } from 'semantic-ui-react'


class TopBar extends React.Component {
  state = { modalOpen: false }

 handleOpen = () => this.setState({ modalOpen: true })

 handleClose = () => this.setState({ modalOpen: false })


  render () {
    return (
      <Header as='h3' block >
      <Grid>
      <Grid.Column  floated='left' width={3}>
      { this.props.current_user ?
        <Container >
        <Header style={{display:'inline'}} as='h4'>{`Hello ${this.props.current_user.username} `}</Header>
        <Button size='tiny' onClick={this.props.logOut} >Log out</Button>
        </Container>
        :null
      }
      </Grid.Column>
      <Modal
        float='left'
         trigger={<Grid.Column  floated='right' width={3}>
          <Segment onClick={this.handleOpen}>
          <List>
           <List.Item>
             <Image circular size='mini' src='/face.jpg' />
             <List.Content>
               <List.Header as='a'>Help</List.Header>
             </List.Content>
           </List.Item>
         </List>
          </Segment>
          </Grid.Column>}
         open={this.state.modalOpen}
         onClose={this.handleClose}
         basic
         size='small'
       >
         <Header icon='browser' content='Instructions' />
         <Modal.Content>
           <Header as='h4' inverted>1. Create new festival. </Header><br/>
           <Header as='h4' inverted>2. Add areas from MAP tab. </Header><br/>
           <Header as='h4' inverted>3. Position the areas on map canvas. </Header><br/>
           <Header as='h4' inverted>4. Create events from NEW EVENTS tab. </Header><br/>
           <Header as='h4' inverted>5. Find your festival from Fest phone app and see if all checks out. </Header><br/>
           <Header as='h4' inverted>6. Send secret code to ticket holders. </Header>

         </Modal.Content>
         <Modal.Actions>
           <Button color='green' onClick={this.handleClose} inverted>
             <Icon name='checkmark' /> Got it
           </Button>
         </Modal.Actions>
       </Modal>
       </Grid>
      </Header>
    )
  }

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
