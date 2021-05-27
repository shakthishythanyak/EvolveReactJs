import React, { useEffect } from 'react';
import styled from 'styled-components';
import { IIconProps, ActionButton, Text, Stack, IStackStyles, Calendar, PrimaryButton } from '@fluentui/react';
import { Addtask } from './components/task/addtask';
import { ITaskInfo, Status } from './Interfaces/task/ITaskInfo';
import { TaskCard } from './components/taskCard/taskCard';

const StudentCard = styled.div`
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
export const initialTasks: ITaskInfo[] = [
    {
        id: 1,
        taskName: "Add Informtaion",
        desc: "To do",
        start: new Date(Date.now()),
        end: new Date(Date.now()),
        status: Status.InProgress,
        assigned: "Shakthi"
    },
    {
        id: 2,
        taskName: "Add Informtaion",
        desc: "To do",
        start: new Date(Date.now()),
        end: new Date(Date.now()),
        status: Status.Completed,
        assigned: "Reshma"
    },
    {
        id: 3,
        taskName: "Add Informtaion",
        desc: "To do",
        start: new Date(Date.now()),
        end: new Date(Date.now()),
        status: Status.Open,
        assigned: "Braja"
    }
];

const stackStyles: IStackStyles = {
    root: {
        height: 800
    }
};

export const testFunct = (task: ITaskInfo) => {
    initialTasks.push(task);
    console.log(initialTasks);
}

const addIcon: IIconProps = { iconName: 'Add', style: { color: 'green' } };

export const Board: React.FunctionComponent = () => {
    const [addOpenTaskClicked, setAddOpenTaskClicked] = React.useState<Boolean>(false);
    const [addProgressTaskClicked, setAddProgressTaskClicked] = React.useState<Boolean>(false);
    const [addCompleteTaskClicked, setAddCompleteTaskClicked] = React.useState<Boolean>(false);
    const [initialTaskData, setInitialTasks] = React.useState<ITaskInfo[]>(initialTasks);
    const openstatusref = React.useRef<HTMLDivElement>(null);
   // const [addTaskFinal, setAddTaskFinal] = React.useState<Boolean>(false);
    var initialCount: Number = initialTasks.length;
    var statusCompare: string = "Y" ;

    const openAddOpenTask = () => {
      setAddOpenTaskClicked(true);
      
      console.log(statusCompare);
      console.log(addOpenTaskClicked);
  }

  const openAddProgressTask = () => {
    setAddProgressTaskClicked(true);
    
    console.log(statusCompare);
    console.log(addProgressTaskClicked);
}

const openAddCompleteTask = () => {
  setAddCompleteTaskClicked(true);
  
  console.log(statusCompare);
  console.log(addCompleteTaskClicked);
}

    const props: ITaskInfo =
    {
        id: 1,
        taskName: "Trying to add the task",
        desc: "To do",
        start: new Date(Date.now() - 10),
        end: new Date(Date.now() + 2),
        assigned: "Shakthi",
        status: Status.Open
    };

    const addParentCall = (task: ITaskInfo) => {
        //setAddTaskFinal(true);
        initialCount = initialTasks.length;
        initialTasks.push(task);
        setInitialTasks(initialTasks);
        setAddOpenTaskClicked(false);
        setAddProgressTaskClicked(false);
        setAddCompleteTaskClicked(false);
    }
    return (
        <>
            <div>
                <Stack horizontal tokens={{ childrenGap: 100 }} styles={stackStyles}>
                    <div className="students">
                        <Text block variant='medium' style={{ fontWeight: 'bold' }}>Not started</Text>
                        <StudentCard>
                            <ActionButton iconProps={addIcon} allowDisabledFocus style={{ color: 'green' }} onClick={() => openAddOpenTask()}>Add Task</ActionButton>
                        </StudentCard>
                        { addOpenTaskClicked && <Addtask status={Status.Open} addParentCall={addParentCall} />
                        }
                        <br/> 
                        {initialTasks && initialTasks.length >= initialCount && initialTasks.filter(x => x.status === Status.Open).map(x=> { return <TaskCard {...x}></TaskCard>})}
                    </div>
                    <div>
                        <Text block variant='medium' style={{ fontWeight: 'bold' }}>In progres</Text>
                        <StudentCard>
                            <ActionButton iconProps={addIcon} allowDisabledFocus style={{ color: 'green' }} onClick={() => openAddProgressTask()}>Add Task</ActionButton>
                        </StudentCard>
                        {addProgressTaskClicked && <Addtask status={Status.InProgress} addParentCall={addParentCall} />
                        }
                        <br/> 
                        {initialTasks && initialTasks.length >= initialCount && initialTasks.filter(x => x.status === Status.InProgress).map(x=> { return <TaskCard {...x}></TaskCard>})}
                    </div>
                    <div>
                        <Text block variant='medium' style={{ fontWeight: 'bold' }}>Completed</Text>
                        <StudentCard>
                            <ActionButton iconProps={addIcon} allowDisabledFocus style={{ color: 'green' }} onClick={() => openAddCompleteTask()}>Add Task</ActionButton>
                        </StudentCard>
                        {addCompleteTaskClicked  && <Addtask status={Status.Completed} addParentCall={addParentCall} />
                        }
                        <br/> 
                        {initialTasks && initialTasks.length >= initialCount && initialTasks.filter(x => x.status === Status.Completed).map(x=> { return <TaskCard {...x}></TaskCard> })}
                    </div>
                </Stack>
            </div>


        </>
    );
}

export default Board;
