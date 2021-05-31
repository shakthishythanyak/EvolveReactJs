import React, { useEffect, useState, useImperativeHandle } from 'react';
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
        end: new Date(Date.now() - 2348239423),
        status: Status.Completed,
        assigned: "Reshma"
    },
    {
        id: 3,
        taskName: "Review FDR cases",
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
interface IBoardProps {
    SelectedView: string;
    SelectedFilter: string[];
}

var viewdetails = "Progress";
var selectedFilters: string[] = [];
var filteredTasks: ITaskInfo[] = [];
type Props = IBoardProps;

export function Board(props: Props) {
    const [addOpenTaskClicked, setAddOpenTaskClicked] = React.useState<Boolean>(false);
    const [addProgressTaskClicked, setAddProgressTaskClicked] = React.useState<Boolean>(false);
    const [addCompleteTaskClicked, setAddCompleteTaskClicked] = React.useState<Boolean>(false);
    const [initialTaskData, setInitialTasks] = React.useState<ITaskInfo[]>(initialTasks);
    [filteredTasks] = React.useState<ITaskInfo[]>(initialTasks);
    var initialCount: Number = initialTasks.length;
    var statusCompare: string = "Y";


    if (viewdetails != props.SelectedView && props.SelectedView != '') {
        viewdetails = props.SelectedView;
    }
    if (selectedFilters.length != props.SelectedFilter.length) {
        selectedFilters = props.SelectedFilter;
        console.log(selectedFilters);
        if (selectedFilters.includes("today")) {
            console.log(initialTasks.filter(x => x.end.getDate() === 31));
            let tempFilteredTasks = initialTasks.filter(x => x.end.getDate() === new Date(Date.now()).getDate());
            filteredTasks = [];
            tempFilteredTasks.map(x => filteredTasks.push(x));
            console.log(tempFilteredTasks);
            console.log(filteredTasks);
        }
    }

    console.log(props.SelectedView);
    console.log(props.SelectedFilter);
    var initialCount: Number = initialTasks.length;
    var statusCompare: string = "Y";

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

    const addParentCall = (task: ITaskInfo) => {
        //setAddTaskFinal(true);
        initialCount = initialTasks.length;
        initialTasks.push(task);
        setInitialTasks(initialTasks);
        setAddOpenTaskClicked(false);
        setAddProgressTaskClicked(false);
        setAddCompleteTaskClicked(false);
    }

    if (viewdetails == "DueDate") {
        console.log(viewdetails + "122")
        return (<>
            <div>
                <span>Due Date View goes here.</span>
            </div>
        </>)
    }
    else {
        console.log(viewdetails + "131")
        return (
            <>{
                <div>
                    <Stack horizontal tokens={{ childrenGap: 100 }} styles={stackStyles}>
                        <div className="students">
                            <Text block variant='medium' style={{ fontWeight: 'bold' }}>Not started</Text>
                            <StudentCard>
                                <ActionButton iconProps={addIcon} allowDisabledFocus style={{ color: 'green' }} onClick={() => openAddOpenTask()}>Add Task</ActionButton>
                            </StudentCard>
                            {addOpenTaskClicked && <Addtask status={Status.Open} addParentCall={addParentCall} />
                            }
                            <br />
                            {filteredTasks && filteredTasks.length >= initialCount && filteredTasks.filter(x => x.status === Status.Open).map(x => { return <TaskCard {...x}></TaskCard> })}
                        </div>
                        <div>
                            <Text block variant='medium' style={{ fontWeight: 'bold' }}>In progres</Text>
                            <StudentCard>
                                <ActionButton iconProps={addIcon} allowDisabledFocus style={{ color: 'green' }} onClick={() => openAddProgressTask()}>Add Task</ActionButton>
                            </StudentCard>
                            {addProgressTaskClicked && <Addtask status={Status.InProgress} addParentCall={addParentCall} />
                            }
                            <br />
                            {filteredTasks && filteredTasks.length >= initialCount && filteredTasks.filter(x => x.status === Status.InProgress).map(x => { return <TaskCard {...x}></TaskCard> })}
                        </div>
                        <div>
                            <Text block variant='medium' style={{ fontWeight: 'bold' }}>Completed</Text>
                            <StudentCard>
                                <ActionButton iconProps={addIcon} allowDisabledFocus style={{ color: 'green' }} onClick={() => openAddCompleteTask()}>Add Task</ActionButton>
                            </StudentCard>
                            {addCompleteTaskClicked && <Addtask status={Status.Completed} addParentCall={addParentCall} />
                            }
                            <br />
                            {filteredTasks && filteredTasks.length >= initialCount && filteredTasks.filter(x => x.status === Status.Completed).map(x => { return <TaskCard {...x}></TaskCard> })}
                        </div>
                    </Stack>
                </div>
            }

            </>
        );
    }
}

export default Board;
