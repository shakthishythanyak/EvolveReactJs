export interface ITaskInfo
{
    id:number;
    taskName:string;
    status:Status;
    allDay?: boolean;
    start: Date;
    end: Date;
    desc?: string;
    resourceId?: string;
    tooltip?: string;
    assigned:string;
} 


export enum Status{
    'Open', 'InProgress', 'Completed'
} 
