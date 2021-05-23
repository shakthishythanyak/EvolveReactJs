export interface ITaskInfo
{
    taskName:string
    taskDesc:string
    dueDate:Date;
    assignee:User;
    status:Status
} 

export interface User
{
    name:string;
    profilePic:string;
}

export enum Status{
    'Open', 'InProgress', 'Completed'
} 