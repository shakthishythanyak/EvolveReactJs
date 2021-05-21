export interface ITaskInfo
{
    id: number;
    taskName:string;
    dueDate:Date;
    assignee:User;
} 

export interface User
{
    name:string;
    profilePic:string;
}