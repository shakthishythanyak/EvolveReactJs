import React, { useEffect } from 'react';
import styled from 'styled-components';
import { IIconProps, ActionButton, Text, Stack, IStackStyles, Calendar, PrimaryButton } from '@fluentui/react';
import { Addtask } from './components/task/addtask';
import { ITaskInfo, Status } from './Interfaces/task/ITaskInfo';
import { Tasks } from './components/task/tasks';
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
    const [addTaskClicked, setAddTaskClicked] = React.useState<Boolean>(false);
    const [initialTaskData, setInitialTasks] = React.useState<ITaskInfo[]>(initialTasks);
    const [addTaskFinal, setAddTaskFinal] = React.useState<Boolean>(false);
    var initialCount: Number = initialTasks.length;


    const openAddTask = () => {
        setAddTaskClicked(true);
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
    const testTaskCard = () => {
        console.log("Entered");
        return <Tasks {...initialTasks}></Tasks>
    }
    const addParentCall = (task: ITaskInfo) => {
        setAddTaskFinal(true);
        console.log("entered 1 2 3");
        initialCount = initialTasks.length;
        initialTasks.push(task);
        setInitialTasks(initialTasks);
        console.log(initialTasks);
        Test(task);
    }
    return (
        <>
            {initialTasks && initialTasks.length >= initialCount && initialTasks.map(x => { return <TaskCard {...x}></TaskCard> })}

            <div style={{ padding: '5px 5px 5px 5px' }}>
                <PrimaryButton onClick={openAddTask}></PrimaryButton>
            </div>
            {addTaskClicked && <Addtask status={Status.Open} addParentCall={addParentCall} />
            }
            <div>
                <Stack horizontal tokens={{ childrenGap: 100 }} styles={stackStyles}>
                    <div className="students">
                        <Text block variant='medium' style={{ fontWeight: 'bold' }}>Not started</Text>
                        <StudentCard>
                            <ActionButton iconProps={addIcon} allowDisabledFocus style={{ color: 'green' }}>Add Task</ActionButton>
                        </StudentCard>
                    </div>
                    <div>
                        <Text block variant='medium' style={{ fontWeight: 'bold' }}>In progres</Text>
                        <StudentCard>
                            <ActionButton iconProps={addIcon} allowDisabledFocus style={{ color: 'green' }}>Add Task</ActionButton>
                        </StudentCard>
                    </div>
                    <div>
                        <Text block variant='medium' style={{ fontWeight: 'bold' }}>Completed</Text>
                        <StudentCard>
                            <ActionButton iconProps={addIcon} allowDisabledFocus style={{ color: 'green' }}>Add Task</ActionButton>
                        </StudentCard>
                    </div>
                </Stack>
            </div>


        </>
    );
}

export default Board;

function Test(task: ITaskInfo) {
    return <TaskCard {...task}></TaskCard>
}