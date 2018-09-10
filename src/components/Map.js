import React from 'react'
import { connect } from 'react-redux'
import { Link} from 'react-router-dom'
import { getAreas, newArea, editArea, deleteArea } from '../actions.js'
import MapImg from './MapImg'
import { Button, Checkbox, Form, Container, Header, Dropdown} from 'semantic-ui-react'


class Map extends React.Component {

  state = {
    name: "",
    description: "",
    icon: "",
    selectedArea: "",
    addArea: false,
    updateArea: false
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

  componentDidMount() {
    this.props.getAreas(this.props.match.params.id)
  }

  setSelectedArea = (area) => {
    if (area) {
      this.setState({
        name: area.name,
        description:area.description,
        selectedArea: area
      })
    }
  }


  handleCategories = (target, { value }) => {;
    let a = this.props.areas.find(a => a.id === value)
    this.setState({
      selectedArea: a
    })
  }

  handleLocationChange = (target, func) => {;
    let a = this.props.areas.find(a => a.id === parseInt(target.target.attrs.value))
    this.setState({
      selectedArea: a
    },() => func(target))
  }

  render() {
    let areaOptions = this.props.areas.map((a) => {
      return {text: a.name, value: a.id}
    })

    return(
      <Container>
        <Dropdown placeholder='Select area' fluid selection options={areaOptions} onChange={this.handleCategories}/>
        <Button.Group attached='bottom'>
          <Button onClick={() => {
            this.setState({
              addArea: true,
              updateArea: false
            })
          }}>Add Area</Button>
          <Button onClick={() => {
            this.setState({
              updateArea: true,
              addArea:false
            })
          }}>Update</Button>
        </Button.Group>
        {
          !this.state.updateArea ? null :
          <Form onSubmit={(e, state)=>{
            this.props.history.push(`/festivals/${this.currentFestival().id}/map`)
            this.props.editArea(e, this.state, this.props.current_user, this.currentFestival().id, this.state.selectedArea.id, {x: this.state.selectedArea.x, y:this.state.selectedArea.y})
            this.setState({
              updateArea: false
            })
          }}>
          <Form.Field>
            <label>Name</label>
            <input required type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <input type="text" name="description" value={this.state.description} onChange={this.handleChange}/>
          </Form.Field>
          <Form.Field>
            <label>Icon</label>
            <input required type="text" name="icon" value={this.state.icon} onChange={this.handleChange}/>
          </Form.Field>
          <Button.Group>
            <Button type='submit'>Update Area</Button>
            <Button onClick={(e) => {
                this.props.deleteArea(this.props.current_user,this.currentFestival().id,this.state.selectedArea.id )
                this.setState({
                  updateArea: false,
                  selectedArea: ""
                })
              }
            }>
              Delete Area
            </Button>
            <Button onClick={() => {
              this.setState({
                updateArea: false
              })
            }}>Close</Button>
          </Button.Group>
          </Form>
        }
        {
          !this.state.addArea ? null :
            <Form onSubmit={(e, state)=>{
              this.props.newArea(e, this.state, this.props.current_user, this.currentFestival().id)
              this.setState({
                addArea: false
              })
            }}>
              <Form.Field>
                <label>Name</label>
                <input required type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
              </Form.Field>
              <Form.Field>
                <label>Description</label>
                <input type="text" name="description" value={this.state.description} onChange={this.handleChange}/>
              </Form.Field>
              <Form.Field>
                <label>Icon</label>
                <input required type="text" name="icon" value={this.state.icon} onChange={this.handleChange}/>
              </Form.Field>
              <Button.Group>
                <Button type='submit'>Add Area</Button>
                <Button onClick={() => {
                  this.setState({
                    addArea: false
                  })
                }}>Close</Button>
              </Button.Group>
          </Form>
        }
        <MapImg setSelectedArea={this.setSelectedArea} festival={this.currentFestival()} selectedArea={this.state.selectedArea} handleLocationChange={this.handleLocationChange}/>
      </Container>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    getAreas: (id) => {getAreas(dispatch, id)},
    newArea: (e, state, current_user, festival_id) => {
      e.preventDefault()
      newArea(dispatch, {...state, current_user, festival_id}
    )},
    editArea: (e, state, current_user, festival_id, area_id, coordinates) => {
      e.preventDefault()
      editArea(dispatch, {...state, current_user, festival_id, area_id, coordinates}
    )},
    deleteArea: (current_user,festival_id, area_id) => {
      deleteArea(dispatch, {current_user,festival_id, area_id})}
  }
}

function mapStateToProps(state){
  return {
    areas: state.area.areas,
    festivals: state.festival.festivals,
    current_user: state.session.current_user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)
