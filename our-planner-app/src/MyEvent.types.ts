  export type statustype  = "New" | "Inprogress" | "Completed";
  export interface  IMyEvent {
    id:number,
    title: string;
    allDay?: boolean;
    start: Date;
    end: Date;
    desc?: string;
    resourceId?: string;
    tooltip?: string;
    status: statustype;
    assigned:string;
    task?:string;

  }
  export interface ICalendarmProps {
}
  export interface IMyEvents {
    MyEvents: IMyEvent[];
}  
export interface IAddTaskFormProps {
    addMyEvent: (s: IMyEvent)=>void;
  }

  export interface IAddTaskFormState {
    myEvent: IMyEvent;
  }