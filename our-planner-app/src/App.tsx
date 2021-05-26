import React, { useState } from 'react';
import './App.css';
import { Addtask } from './components/task/addtask';
import { ITaskInfo, Status } from './Interfaces/task/ITaskInfo';
import { TaskCard } from './components/taskCard/taskCard';
import { DefaultButton, PrimaryButton } from '@fluentui/react';


export const initialTasks : ITaskInfo[] =[
  {
    id:1,
    taskName:"Add Informtaion",
    desc:"To do",
    start:new Date(Date.now()),
    end:new Date(Date.now()),
    status:Status.InProgress,
    assigned: "Shakthi"
  },
  {
    id:2,
    taskName:"Add Informtaion",
    desc:"To do",
    start:new Date(Date.now()),
    end:new Date(Date.now()),
    status:Status.Completed,
    assigned: "Reshma"
  },
  {
    id:3,
    taskName:"Add Informtaion",
    desc:"To do",
    start:new Date(Date.now()),
    end:new Date(Date.now()),
    status:Status.Open,
    assigned: "Braja"
  }
];


type Props = { parentCallback(task: ITaskInfo): void };
function App() {
  const taskAdded = (task: ITaskInfo) =>
  {
console.log(task);
initialTasks.push(task);
  }
 
const getInitialTasks=():ITaskInfo[] =>
{
  return initialTasks;
}


  const props: ITaskInfo =
{
  id:1,
  taskName:"Trying to add the task",  
  desc:"To do",
    start:new Date(Date.now() - 10),
    end: new Date(Date.now()+2),
  assigned: "Shakthi",
  status: Status.Open 
};
const [addTaskClicked, setAddTaskClicked] = React.useState<Boolean>(false); 
const openAddTask = () =>
{
  setAddTaskClicked(true);
}

  return (
    <>
    <div style={{padding:'5px 5px 5px 5px'}}>     
       <PrimaryButton onClick={openAddTask}></PrimaryButton>
    </div>   
    {addTaskClicked && 
      <Addtask {...props.status} />
    }
    {initialTasks.map(x =>
      <div style={{paddingLeft:'500px'}}> 
      <br></br>
      <TaskCard {...x} />
      </div>
    )};
    </>
  );
}




export default App;
