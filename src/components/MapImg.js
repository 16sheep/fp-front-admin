import React, { Component } from 'react';
import { connect } from 'react-redux'
import Konva from 'konva';
import { render } from 'react-dom';
import { Stage, Layer, Text, Image } from 'react-konva';
import { getAreas, newArea, editArea } from '../actions.js'
import { Container } from 'semantic-ui-react'



class CanvasImage extends React.Component {
  state = {
    image: null
  };

  componentDidMount() {
    const image = new window.Image();
    image.src = this.props.i
    image.onload = () => {
      this.setState({
        image: image
      });
    };
  }

  render() {
    return (
      <Image
        width={400}
        height={600}
        image={this.state.image}
      />
    );
  }
}

class MapImg extends Component {

  handleThirdDragEnd = e => {
    this.props.handleLocationChange(e, this.edit )
  };

  componentDidUpdate() {
    if (this.props.selectedArea){
      let area = this.props.areas.find(a => a.id === this.props.selectedArea.id)
      this.props.setSelectedArea(area)
    }
  }

  edit = (e) => {
    this.props.editArea(e,
      this.props.selectedArea,
      this.props.current_user,
      this.props.festival.id,
      this.props.selectedArea.id,
      this.getMousePos(e))
  }

  getMousePos = (e) => {
    let canvas = document.querySelector('canvas')
    let rect =  canvas.getBoundingClientRect()
    return {x: e.evt.clientX - rect.left, y: e.evt.clientY -rect.top}
    }

  render() {
    return (
      <Stage name="myCanvas" width={400} height={600}>
        <Layer>
          <CanvasImage i={this.props.festival.map_img}>
          </CanvasImage>
        </Layer>
        <Layer>

          {this.props.areas.map ((a) =>
            <Text
              key={`areapoint-${a.id}`}
              text={a.name}
              value={a.id}
              fill={Konva.Util.getRandomColor()}
              x={a.x ? a.x : 100}
              y={a.y ? a.y : 100}
              draggable
              onDragEnd={this.handleThirdDragEnd}
            />
          )}
        </Layer>
      </Stage>
    );
  }
}

function mapDispatchToProps(dispatch){
  return {
    getAreas: (id) => {getAreas(dispatch, id)},
    newArea: (e, state, current_user, festival_id) => {
      newArea(dispatch, {...state, current_user, festival_id}
    )},
    editArea: (e, state, current_user, festival_id, area_id, coordinates) => {
      editArea(dispatch, {...state, current_user, festival_id, area_id, coordinates}
    )}
  }
}

function mapStateToProps(state){
  return {
    areas: state.area.areas,
    festivals: state.festival.festivals,
    current_user: state.session.current_user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapImg)
