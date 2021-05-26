import React, { Component } from 'react';
import { IStyleSet, Label, ILabelStyles, Pivot, PivotItem } from '@fluentui/react';
import Schedule from "./Schedule"
import Calendar from "./Calendar"

const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
  root: { marginTop: 10 },
};
class Tab extends Component{

    
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
        <Pivot aria-label="Basic Pivot Example" >
      <PivotItem
        headerText="Board"
        headerButtonProps={{
          'data-order': 1,
          'data-title': 'My Files Title',
        }}
      >
        <Label styles={labelStyles}>my Board Component goes here</Label>
      </PivotItem>
      <PivotItem headerText="Schedule">
        <Label styles={labelStyles}><Calendar></Calendar></Label>
      </PivotItem>
    </Pivot>
      );
    }
  };
export default Tab;