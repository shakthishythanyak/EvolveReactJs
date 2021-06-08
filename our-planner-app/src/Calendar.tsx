import React, { useState, Children } from 'react'
import { Calendar, View, DateLocalizer } from 'react-big-calendar'
import moment from 'moment';
import EventComponent from "./EventComponent";
import * as faker from "faker"
import {IMyEvent,IMyEvents,ICalendarmProps,statustype} from "./MyEvent.types"
import {ITaskInfo,Status} from "./Interfaces/task/ITaskInfo"
import { DefaultPalette, Facepile, Icon, IFacepileProps, IIconStyles, IStackStyles, IStackTokens, PersonaInitialsColor, rgb2hex, Stack } from "@fluentui/react";
import { momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { date } from 'faker';
import { constants } from 'perf_hooks';
import {initialTasks} from "./Board"
import './components/task/task.css';

const localizer = momentLocalizer(moment);
const currentUser = "Shakthi";
const myEvents:ITaskInfo[]=initialTasks.filter(x=>x.assigned==currentUser);
//console.log(json);


// const myEvents:ITaskInfo[] = [
//   { id: 1, taskName: "My Task Number 1", start: new Date(), end: new Date(), status:Status.Open, assigned:"Braja"},
//   { id: 2, taskName: "My Task Number 2", start: new Date("2021-05-23"), end: new Date("2021-05-23"), status:Status.InProgress, assigned:"Braja"},
//   { id: 3, taskName: "My Task Number 3", start: new Date("2021-05-25"), end: new Date("2021-05-25"), status:Status.Completed, assigned:"Braja"}
// ];

//const myevents2:ITaskInfo = initialTasks;
const allViews: View[] = ['week', 'month'];
//class customview implements View

interface Props {
    //localizer: DateLocalizer;
    myEvents:ITaskInfo[];
    //addParentCall: (task: ITaskInfo) => void;
}

export default function SelectableCalendar (props: Props) {
    // const [events, setEvents] = useState([
    //   //{start: moment().toDate(), end: moment().add(1, "hours").toDate(), title: "test", allDay:true}
    //   {}
    // ] as CalendarEvent[]);

    const {myEvents} = props;
    const [events, setEvents] = useState( myEvents as ITaskInfo[]);
    console.log(myEvents)
    //const handleSelect = ({ start, end} :{start:any, end:any}) => {
      const handleSelect = ({ start, end} :{start:any, end:any}) => {
        const title = window.prompt('New Event name')
 

        if (title) {
            let newEvent = {} as ITaskInfo;
            newEvent.start = moment(start).toDate();
            newEvent.end = moment(end).toDate();
            newEvent.taskName = title;
            newEvent.status=Status.Open;

            // Erroneous code
            // events.push(newEvent)
            // setEvents(events)
            setEvents([
              ...events,
              newEvent
            ])
        }
      }
    return (
      <><div style={{ height: "80vh" }}>
        <Calendar
          selectable
          localizer={localizer}
         events={events}
         defaultView='month'
         views={allViews}
           defaultDate={new Date()} 
           onSelectEvent={event => Event}
           eventPropGetter={event=>({ style:{backgroundColor: "skyblue",         borderRadius: '0px',          opacity: 0.8,          color: 'black', border: '0px',display: 'block'}})}
           
          //onSelectSlot={handleSelect}
        startAccessor='start'
        endAccessor='start'
        titleAccessor='taskName'
          components={{
            event: Event
            
          }}
          style={{  }}

        />
        </div>
      </>
    )
  }

  function Event({ event } : {event:ITaskInfo}) {
    console.log(event);
    if (event.status==Status.Completed) {
      return ( <span>
     <Icon iconName="CompletedSolid" className="iconCompleted" />  &nbsp;
      <del>{event.taskName}</del>
      
    </span>);
    }
    else if (event.status==Status.Open) {
      return (
        <span>
          <Icon iconName="LocationCircle" className="iconOpen" />&nbsp;
            {event.taskName}
            </span>    
      );
    }
    else
    {
    return (
      <span>
        <Icon iconName="CircleHalfFull" className="iconInProgress" />&nbsp;
          {event.taskName}
          </span>    
    );
    }
  } 
  //export default SelectableCalendar; 
// export default function Availability() {
//     return (
//       <div style={{ height: "80vh" }}>
//         <SelectableCalendar localizer={localizer} myEvents={myEvents} />
//       </div>
//     );
//   }