import React, { useState } from 'react'
import { Calendar, View, DateLocalizer } from 'react-big-calendar'
import moment from 'moment';
import EventComponent from "./EventComponent";
import {IMyEvent,IMyEvents,ICalendarmProps,statustype} from "./MyEvent.types"
import {ITaskInfo,Status} from "./Interfaces/task/ITaskInfo"

import { momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { constants } from 'perf_hooks';

const localizer = momentLocalizer(moment);
const myEvents:ITaskInfo[] = [
  { id: 1, taskName: "My Task Number 1", start: new Date(), end: new Date(), status:Status.Open, assigned:"Braja"},
  { id: 2, taskName: "My Task Number 2", start: new Date("2021-05-23"), end: new Date("2021-05-23"), status:Status.InProgress, assigned:"Braja"},
  { id: 3, taskName: "My Task Number 3", start: new Date("2021-05-25"), end: new Date("2021-05-25"), status:Status.Completed, assigned:"Braja"}
];

const allViews: View[] = ['week', 'month'];

interface Props {
    localizer: DateLocalizer;
    myEvents:ITaskInfo[];
}

class CalendarEvent {
    title: string;
    allDay: boolean;
    start: Date;
    end: Date;
    desc: string;
    resourceId?: string;
    tooltip?: string;

    constructor(_title: string, _start: Date, _endDate: Date, _allDay?: boolean, _desc?: string, _resourceId?: string) {
        this.title = _title;
        this.allDay = _allDay || false;
        this.start = _start;
        this.end = _endDate;
        this.desc = _desc || '';
        this.resourceId = _resourceId;
    }
  }


function SelectableCalendar (props: Props) {
    // const [events, setEvents] = useState([
    //   //{start: moment().toDate(), end: moment().add(1, "hours").toDate(), title: "test", allDay:true}
    //   {}
    // ] as CalendarEvent[]);

    const {localizer,myEvents} = props;
    const [events, setEvents] = useState( myEvents as ITaskInfo[]);
    
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
      <>
        <Calendar
          selectable
          localizer={localizer}
         events={events}
         defaultView='month'
         views={allViews}
           defaultDate={new Date()}
           onSelectEvent={event => Event}
          onSelectSlot={handleSelect}
        startAccessor='start'
        endAccessor='end'
        titleAccessor='taskName'
          components={{
            event: Event
          }}
        />
      </>
    )
  }

  function Event({ event } : {event:ITaskInfo}) {
    if (event.status==Status.Completed) {
      return ( <span>
     
      <del>{event.taskName}</del>
      
    </span>);
    }
    else
    {
    return (
      <span>
          {event.taskName}
          </span>    
    );
    }
  }  
export default function Availability() {
    return (
      <div style={{ height: "100vh" }}>
        <SelectableCalendar localizer={localizer} myEvents={myEvents} />
      </div>
    );
  }