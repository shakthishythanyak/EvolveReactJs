import React, { Component } from 'react';
import { ITaskType, ITaskTypeProps } from './ITaskType.types';
//import './ClassRoom.css';
import './Tab2'

class Schedule extends Component {



  componentDidMount() {
    console.log("component Did Mount >>>>>>>>");    
  }

  componentDidUpdate() {
    console.log("component Did Update >>>>>>>");
  }

  componentWillUnmount() {
    console.log("component Will Unmount >>>>>>>>");
  }

  render() {
    return (
<div><h1>hello</h1></div>

    );
}
}

export default Schedule;