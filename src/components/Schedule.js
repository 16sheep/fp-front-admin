import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getEvents, getAreas } from '../actions.js'
import Scheduler, {SchedulerData, DATE_FORMAT, DATETIME_FORMAT} from 'react-big-scheduler'
import 'react-big-scheduler/lib/css/style.css'
import moment from 'moment'
import { Container } from 'semantic-ui-react'



class Schedule extends React.Component {

  state = {
    viewModel: {
      view : 2,
      date : this.props.festivals
      .find(f => f.id === parseInt(this.props.match.params.id))
      .date_from
    }
  }

  currentFestival = () => {
    let id = parseInt(this.props.match.params.id)
    return this.props.festivals.find(f => f.id === id)
  }

  setViewModel = (view, date) => {
    let schedulerData = new SchedulerData(new moment(date).format(DATE_FORMAT), view);
    schedulerData.setResources(this.props.areas);
    schedulerData.setEvents(this.props.events);
    schedulerData.config.schedulerWidth = 600
    console.log("Schedulerdata", schedulerData);
    return schedulerData
  }


  componentDidMount () {
    this.props.getAreas(this.props.match.params.id)
    this.props.getEvents(this.props.match.params.id)
  }

  prevClick = (schedulerData)=> {
    let d = this.state.viewModel.date
    if (this.state.viewModel.view === 2) {
      d = new moment(d)
      d = moment(d).subtract(1, 'months');
    }
    else if (this.state.viewModel.view === 1) {
      d = new moment(d)
      d = moment(d).subtract(7, 'days');
    }
    else if (this.state.viewModel.view === 0) {
      d = new moment(d)
      d = moment(d).subtract(1, 'days');
    }
    else if (this.state.viewModel.view === 3) {
      d = new moment(d)
      d = moment(d).subtract(3, 'months');
    }
    else if (this.state.viewModel.view === 4) {
      d = new moment(d)
      d = moment(d).subtract(12, 'months');
    }
    this.setState({
      viewModel: {...this.state.viewModel, date:d}
    })
  }


  nextClick = (schedulerData)=> {
    let d = this.state.viewModel.date
    if (this.state.viewModel.view === 2) {
      d = new moment(d)
      d = moment(d).add(1, 'months');
    }
    else if (this.state.viewModel.view === 1) {
      d = new moment(d)
      d = moment(d).add(7, 'days');
    }
    else if (this.state.viewModel.view === 0) {
      d = new moment(d)
      d = moment(d).add(1, 'days');
    }
    else if (this.state.viewModel.view === 3) {
      d = new moment(d)
      d = moment(d).add(3, 'months');
    }
    else if (this.state.viewModel.view === 4) {
      d = new moment(d)
      d = moment(d).add(12, 'months');
    }
    this.setState({
      viewModel: {...this.state.viewModel, date:d}
    })
  }

  onViewChange = (schedulerData, view) => {
    this.setState({
      viewModel: {...this.state.viewModel, view:view.viewType}
    })
  }

  onSelectDate = (schedulerData) => {
    this.setState({
      viewModel: {...this.state.viewModel}
    })
  }

  eventClicked = (schedulerData, event) => {
    this.props.history.push(`/festivals/${this.currentFestival().id}/events/${event.id}`)
  };

  render(){
    const {viewModel} = this.state
    return(
      <Container>
        {this.props.events.length !== 0 ? <Scheduler schedulerData={this.setViewModel(viewModel.view, viewModel.date)}
           prevClick={this.prevClick}
           nextClick={this.nextClick}
           onSelectDate={this.onSelectDate}
           onViewChange={this.onViewChange}
           eventItemClick={this.eventClicked}
          /> : null
        }
      </Container>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    getEvents: (id) => {getEvents(dispatch, id)},
    getAreas: (id) => {getAreas(dispatch, id)}
  }
}

function mapStateToProps(state){
  return {
    areas: state.area.areas,
    events: [...state.event.events].sort((a,b) => {
    return   a.time_from < b.time_from
    }).map((a) => {
      a.title = a.name
      a.start = new moment(a.time_from).format(DATETIME_FORMAT)
      a.end = new moment(a.time_until).format(DATETIME_FORMAT)
      a.resourceId = a.area_id
      return a
    }),
    festivals: state.festival.festivals,
    current_user: state.session.current_user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedule)
