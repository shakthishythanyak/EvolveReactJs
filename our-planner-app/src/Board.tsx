import React, {useState} from 'react';
import styled from 'styled-components';
import {IIconProps, ActionButton,Text, Stack, IStackStyles, Calendar, DefaultButton, PrimaryButton} from '@fluentui/react';
import { Addtask } from './components/task/addtask';
import { ITaskInfo, Status } from './Interfaces/task/ITaskInfo';
import { TaskCard } from './components/taskCard/taskCard';

const StudentCard =styled.div`
border-style: solid;
border-width: 0.5px;
border-color: rgba(0, 0, 0, 0.05);
border-radius: 6px;
box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 3px;
position: relative;
white-space: normal;
background-color: rgb(255, 255, 255);
box-sizing: border-box;
margin: 7px;
display: 'flex';
justify-content: 'center';
width: 300px;
margin-left: 1px;
`;

const stackStyles: IStackStyles = {
    root: {
      height: 800
    }
  };

const addIcon: IIconProps = { iconName: 'Add' ,style: { color: 'green' }};


const result : ITaskInfo[] = [];
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

export var initialTaskstest : ITaskInfo [];
type Props = { parentCallback(task: ITaskInfo): void };

export const Board: React.FunctionComponent = () => {
   
  
 var [initialTaskstest, setCount] = useState(initialTasks);
 //setCount (initialTasks);
 const taskAdded = (task: ITaskInfo) =>
{
task.id =Math.random();
//console.log(task);
//initialTasks.push(task);
initialTaskstest = [...initialTaskstest, task];
setCount(initialTaskstest);
console.log(initialTaskstest);
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
  taskAdded();
}

    return (
<div>
    <Stack horizontal tokens={{ childrenGap: 100 }} styles={stackStyles}>
        <div className="students">
        <Text block variant ='medium' style ={{fontWeight:'bold'}}>Not started</Text>
        <StudentCard>
        <ActionButton iconProps={addIcon} allowDisabledFocus style ={{color :'green'}}>Add Task</ActionButton>
        </StudentCard>
        </div>
        <div>
        <Text block variant ='medium'style ={{fontWeight:'bold'}}>In progres</Text>
        <StudentCard>
        <ActionButton iconProps={addIcon} allowDisabledFocus style ={{color :'green'}} onClick={openAddTask}>Add Task</ActionButton>
        </StudentCard>
        </div>
        <div>
        <Text block variant ='medium' style ={{fontWeight:'bold'}}>Completed</Text>
        <StudentCard>
        <ActionButton iconProps={addIcon} allowDisabledFocus style ={{color :'green'}} onClick={openAddTask} >Add Task</ActionButton>
        </StudentCard>
        {addTaskClicked && 
        <Addtask {...props.status} />
        }
        {initialTaskstest.map(x =>
        <div style={{paddingLeft:'0px'}}> 
        <br></br>
        <TaskCard {...x} />
        </div>
        )}
        </div>
        </Stack>
</div>
    );
}

export default Board;