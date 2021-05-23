import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Addtask } from './components/task/addtask';
import { ITaskInfo, Status } from './Interfaces/task/ITaskInfo';
import { User } from './Interfaces/task/ITaskInfo';
import { TaskCard } from './components/taskCard/taskCard';



function App() {
  const user: User ={
    name: "Shakthi",
    profilePic:""

  }
  const props: ITaskInfo =
{
  taskName:"Trying to add the task",  
  taskDesc:"To do",
  dueDate: new Date(Date.now()-2),
  assignee: user,
  status: Status.Open 
};
  return (
    <>
    <div style={{padding:'5px 5px 5px 5px'}}>
     
     <Addtask {...props} />
     </div>    

       <div style={{paddingLeft:'500px'}}> 
       <TaskCard {...props} />
       </div>
    </>
  );
}

export default App;
