import React, { useEffect, useState, useImperativeHandle } from 'react';
import styled from 'styled-components';
import { IIconProps, ActionButton, Text, Stack, IStackStyles, Calendar, PrimaryButton } from '@fluentui/react';
import { Addtask } from './components/task/addtask';
import { ITaskInfo, Status } from './Interfaces/task/ITaskInfo';
import { TaskCard } from './components/taskCard/taskCard';
import moment from 'moment';
import "datejs";

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
        end: new Date(new Date(Date.now()).setDate(new Date(Date.now()).getDate() + 3)),
        status: Status.Open,
        assigned: "Braja"
    },
    {
        id: 4,
        taskName: "Review FDR cases",
        desc: "To do",
        start: new Date(Date.now()),
        end: new Date(new Date(Date.now()).setDate(new Date(Date.now()).getDate() + 16)),
        status: Status.Open,
        assigned: "Braja"
    },
    {
        id: 5,
        taskName: "Review FDR cases",
        desc: "To do",
        start: new Date(Date.now()),
        end: new Date(new Date(Date.now()).setDate(new Date(Date.now()).getDate() + 7)),
        status: Status.Open,
        assigned: "Braja"
    },
    {
        id: 6,
        taskName: "Review FDR cases",
        desc: "To do",
        start: new Date(Date.now()),
        end: new Date(new Date(Date.now()).setDate(new Date(Date.now()).getDate() + 1)),
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
const addStatusCircle: IIconProps = { iconName: 'StatusCircleRing' };
interface IBoardProps {
    SelectedView: string;
    SelectedFilter: string[];
}

var viewdetails = "Progress";
var selectedFilters: string[] = [];
type Props = IBoardProps;

export function Board(props: Props) {
    const [addOpenTaskClicked, setAddOpenTaskClicked] = React.useState<Boolean>(false);
    const [addProgressTaskClicked, setAddProgressTaskClicked] = React.useState<Boolean>(false);
    const [addCompleteTaskClicked, setAddCompleteTaskClicked] = React.useState<Boolean>(false);
    const [addLateTaskClicked, setAddLateTaskClicked] = React.useState<Boolean>(false);
    const [addTodayTaskClicked, setAddTodayTaskClicked] = React.useState<Boolean>(false);
    const [addTomorrowTaskClicked, setAddTomorrowTaskClicked] = React.useState<Boolean>(false);
    const [addThisWeekTaskClicked, setAddThisWeekTaskClicked] = React.useState<Boolean>(false);
    const [addNextWeekTaskClicked, setAddNextWeekTaskClicked] = React.useState<Boolean>(false);
    const [addFutureTaskClicked, setAddFutureTaskClicked] = React.useState<Boolean>(false);
    const [addNoDateTaskClicked, setAddNoDateTaskClicked] = React.useState<Boolean>(false);
    const [initialTaskData, setInitialTasks] = React.useState<ITaskInfo[]>(initialTasks);
    const [filteredTasks, setFilteredTasks] = React.useState<ITaskInfo[]>(initialTasks);
    var statusCompare: string = "Y";
    console.log(selectedFilters);
    let currentDate = new Date(Date.now());
    if (selectedFilters.length !== props.SelectedFilter.length) {
        selectedFilters = props.SelectedFilter;
        console.log(selectedFilters);
    }
    useEffect(() => {
        console.log("Check entry");
        getFilteredTasks();

    }, [selectedFilters.length]);

    if (viewdetails != props.SelectedView && props.SelectedView != '') {
        viewdetails = props.SelectedView;
    }
    const getFilteredTasks = () => {
        let tempFilteredTasks: ITaskInfo[] = [];
        setFilteredTasks([]);
        if (selectedFilters.length == 0) {
            setFilteredTasks(initialTasks);
        }
        else {
            console.log("Entered Else");
            console.log("Initial filtered", filteredTasks);
            console.log("Initial tasks", initialTasks);
            if (selectedFilters.includes("today")) {
                initialCount = filteredTasks.length;
                initialTasks.filter(x => x.end.getDate() === currentDate.getDate() && x.end.getMonth() === currentDate.getMonth() && x.end.getFullYear() === currentDate.getFullYear()).map(x => tempFilteredTasks.push(x));
                console.log(tempFilteredTasks);
            }
            if (selectedFilters.includes("late")) {
                initialCount = filteredTasks.length;
                initialTasks.filter(x => x.end.getFullYear() < currentDate.getFullYear() || x.end.getMonth() < currentDate.getMonth() || x.end.getDate() < currentDate.getDate()).map(x => tempFilteredTasks.push(x));
                console.log(tempFilteredTasks);
            }
            if (selectedFilters.includes("tomorrow")) {
                initialCount = filteredTasks.length;
                let tomorrowDate = new Date(currentDate);
                tomorrowDate.setDate(tomorrowDate.getDate() + 1);
                initialTasks.filter(x => x.end.getFullYear() === tomorrowDate.getFullYear() && x.end.getMonth() === tomorrowDate.getMonth() && x.end.getDate() === tomorrowDate.getDate()).map(x => tempFilteredTasks.push(x));
                console.log(initialTasks.filter(x => x.end.getFullYear() === tomorrowDate.getFullYear() && x.end.getMonth() === tomorrowDate.getMonth() && x.end.getDate() === tomorrowDate.getDate()));
            }
            if (selectedFilters.includes("thisWeek")) {
                initialCount = filteredTasks.length;
                initialTasks.filter(x => x.end.setHours(0, 0, 0, 0) > new Date(Date.now()).next().day().setHours(0, 0, 0, 0) && (x.end.setHours(0, 0, 0, 0) < new Date(Date.now()).next().sunday().setHours(0, 0, 0, 0))).map(x => tempFilteredTasks.push(x));
            }
            if (selectedFilters.includes("nextWeek")) {
                initialCount = filteredTasks.length;
                initialTasks.filter(x => x.end.setHours(0, 0, 0, 0) >= new Date(Date.now()).next().sunday().setHours(0, 0, 0, 0) && x.end.setHours(0, 0, 0, 0) < new Date(Date.now()).next().sunday().addDays(7).setHours(0, 0, 0, 0)).map(x => tempFilteredTasks.push(x));
            }
            if (selectedFilters.includes("future")) {
                initialCount = filteredTasks.length;
                initialTasks.filter(x => x.end.setHours(0, 0, 0, 0) >= new Date(Date.now()).next().sunday().addDays(7).setHours(0, 0, 0, 0)).map(x => tempFilteredTasks.push(x));
            }
            if (selectedFilters.includes("noDate")) {
                initialCount = filteredTasks.length;
                initialTasks.filter(x => x.end.setHours(0, 0, 0, 0) === new Date(2000, 1, 1).setHours(0, 0, 0, 0)).map(x => tempFilteredTasks.push(x));
            }
            setFilteredTasks(tempFilteredTasks);
            console.log(filteredTasks);
        }
    }

    var initialCount: Number = initialTasks.length;

    const openAddOpenTask = () => {
        setAddOpenTaskClicked(true);
    }

    const openAddProgressTask = () => {
        setAddProgressTaskClicked(true);
    }

    const openAddCompleteTask = () => {
        setAddCompleteTaskClicked(true);
    }

    const openAddLateTask = () => {
        setAddLateTaskClicked(true);
    }

    const openAddTodayTask = () => {
        setAddTodayTaskClicked(true);
    }

    const openAddTomorrowTask = () => {
        setAddTomorrowTaskClicked(true);
    }

    const openAddThisWeekTask = () => {
        setAddThisWeekTaskClicked(true);
    }
    const openAddNextWeekTask = () => {
        setAddNextWeekTaskClicked(true);
    }

    const openAddFutureTask = () => {
        setAddFutureTaskClicked(true);
    }

    const openAddNoDateTask = () => {
        setAddNoDateTaskClicked(true);
    }
    const addParentCall = (task: ITaskInfo) => {
        //setAddTaskFinal(true);
        initialCount = initialTasks.length;
        initialTasks.push(task);
        setInitialTasks(initialTasks);
        setAddOpenTaskClicked(false);
        setAddProgressTaskClicked(false);
        setAddCompleteTaskClicked(false);
        setAddLateTaskClicked(false);
        setAddTodayTaskClicked(false);
        setAddTomorrowTaskClicked(false);
        setAddThisWeekTaskClicked(false);
        setAddNextWeekTaskClicked(false);
        setAddFutureTaskClicked(false);
        setAddNoDateTaskClicked(false);
        console.log('testing date');
        console.log(new Date(Date.now()).setHours(0, 0, 0, 0));
        console.log(task.start.setHours(0, 0, 0, 0));
        console.log(new Date(task.start.getTime() - new Date(Date.now()).getTime()));
        console.log(new Date(Date.now()).next().sunday().getDate());
        console.log(new Date(Date.now()).next().sunday().addDays(7).setHours(0, 0, 0, 0));
        console.log(new Date(Date.now()).next().day().setHours(0, 0, 0, 0));
        console.log(new Date(Date.now()).next().day().setHours(0, 0, 0, 0));
        console.log((new Date(2000, 1, 1).setHours(0, 0, 0, 0)));
    }

    if (viewdetails == "DueDate") {
        console.log(viewdetails + "122")
        return (<>
            {
              <div  style={{ overflow :'scroll' , width:'93vw', height:'40vw'}}>
                <Stack horizontal tokens={{ childrenGap: 50 }} styles={stackStyles}>
                    <div className="students">
                        <Text block variant='medium' style={{ fontWeight: 'bold' }}>Late</Text>
                        <StudentCard>
                            <ActionButton iconProps={addIcon} allowDisabledFocus style={{ color: 'green' }} onClick={() => openAddLateTask()}>Add Task</ActionButton>
                        </StudentCard>
                        {addLateTaskClicked && <Addtask status={Status.Open} addParentCall={addParentCall} />
                        }
                        <br />
                        {filteredTasks.filter(x => x.status === Status.Open && x.end.setHours(0, 0, 0, 0) < new Date(Date.now()).setHours(0, 0, 0, 0) && x.end.setHours(0, 0, 0, 0) != new Date(2000, 1, 1).setHours(0, 0, 0, 0)).map(x => { return <TaskCard {...x}></TaskCard> })}
                    </div>
                    <div>
                        <Text block variant='medium' style={{ fontWeight: 'bold' }}>Today</Text>
                        <StudentCard>
                            <ActionButton iconProps={addIcon} allowDisabledFocus style={{ color: 'green' }} onClick={() => openAddTodayTask()}>Add Task</ActionButton>
                        </StudentCard>
                        {addTodayTaskClicked && <Addtask status={Status.Open} addParentCall={addParentCall} />
                        }
                        <br />
                        {filteredTasks.filter(x => x.status === Status.Open && x.end.setHours(0, 0, 0, 0) === new Date(Date.now()).setHours(0, 0, 0, 0)).map(x => { return <TaskCard {...x}></TaskCard> })}
                    </div>
                    <div>
                        <Text block variant='medium' style={{ fontWeight: 'bold' }}>Tomorrow</Text>
                        <StudentCard>
                            <ActionButton iconProps={addIcon} allowDisabledFocus style={{ color: 'green' }} onClick={() => openAddTomorrowTask()}>Add Task</ActionButton>
                        </StudentCard>
                        {addTomorrowTaskClicked && <Addtask status={Status.Open} addParentCall={addParentCall} />
                        }
                        <br />
                        {filteredTasks && filteredTasks.filter(x => x.status === Status.Open && x.end.setHours(0, 0, 0, 0) === new Date(Date.now()).next().day().setHours(0, 0, 0, 0)).map(x => { return <TaskCard {...x}></TaskCard> })}
                    </div>
                    <div>
                        <Text block variant='medium' style={{ fontWeight: 'bold' }}>This Week</Text>
                        <StudentCard>
                            <ActionButton iconProps={addIcon} allowDisabledFocus style={{ color: 'green' }} onClick={() => openAddThisWeekTask()}>Add Task</ActionButton>
                        </StudentCard>
                        {addThisWeekTaskClicked && <Addtask status={Status.Open} addParentCall={addParentCall} />
                        }
                        <br />
                        {filteredTasks && filteredTasks.filter(x => x.status === Status.Open && x.end.setHours(0, 0, 0, 0) > new Date(Date.now()).next().day().setHours(0, 0, 0, 0) && (x.end.setHours(0, 0, 0, 0) < new Date(Date.now()).next().sunday().setHours(0, 0, 0, 0))).map(x => { return <TaskCard {...x}></TaskCard> })}
                    </div>
                    <div>
                        <Text block variant='medium' style={{ fontWeight: 'bold' }}>Next Week</Text>
                        <StudentCard>
                            <ActionButton iconProps={addIcon} allowDisabledFocus style={{ color: 'green' }} onClick={() => openAddNextWeekTask()}>Add Task</ActionButton>
                        </StudentCard>
                        {addNextWeekTaskClicked && <Addtask status={Status.Open} addParentCall={addParentCall} />
                        }
                        <br />
                        {filteredTasks && filteredTasks.filter(x => x.status === Status.Open && x.end.setHours(0, 0, 0, 0) >= new Date(Date.now()).next().sunday().setHours(0, 0, 0, 0) && x.end.setHours(0, 0, 0, 0) < new Date(Date.now()).next().sunday().addDays(7).setHours(0, 0, 0, 0)).map(x => { return <TaskCard {...x}></TaskCard> })}
                    </div>
                    <div>
                        <Text block variant='medium' style={{ fontWeight: 'bold' }}>Future</Text>
                        <StudentCard>
                            <ActionButton iconProps={addIcon} allowDisabledFocus style={{ color: 'green' }} onClick={() => openAddFutureTask()}>Add Task</ActionButton>
                        </StudentCard>
                        {addFutureTaskClicked && <Addtask status={Status.Open} addParentCall={addParentCall} />
                        }
                        <br />
                        {filteredTasks && filteredTasks.filter(x => x.status === Status.Open && x.end.setHours(0, 0, 0, 0) >= new Date(Date.now()).next().sunday().addDays(7).setHours(0, 0, 0, 0)).map(x => { return <TaskCard {...x}></TaskCard> })}
                    </div>
                    <div>
                        <Text block variant='medium' style={{ fontWeight: 'bold' }}>No Date</Text>
                        <StudentCard>
                            <ActionButton iconProps={addIcon} allowDisabledFocus style={{ color: 'green' }} onClick={() => openAddNoDateTask()}>Add Task</ActionButton>
                        </StudentCard>
                        {addNoDateTaskClicked && <Addtask status={Status.Open} addParentCall={addParentCall} />
                        }
                        <br />
                        {filteredTasks && filteredTasks.filter(x => x.status === Status.Open && x.end.setHours(0, 0, 0, 0) === new Date(2000, 1, 1).setHours(0, 0, 0, 0)).map(x => { return <TaskCard {...x}></TaskCard> })}
                    </div>
                </Stack>
                </div>
            }
        </>)
    }
    else {

        return (
            <>{
                <div style={{ overflow :'scroll' , width:'93vw' , height:'40vw'}}>
                    <Stack horizontal tokens={{ childrenGap: 100 }} styles={stackStyles}>
                        <div className="students">
                            <Text block variant='medium' style={{ fontWeight: 'bold' }}>Not started</Text>
                            <StudentCard>
                                <ActionButton iconProps={addIcon} allowDisabledFocus style={{ color: 'green' }} onClick={() => openAddOpenTask()}>Add Task</ActionButton>
                            </StudentCard>
                            {addOpenTaskClicked && <Addtask status={Status.Open} addParentCall={addParentCall} />
                            }
                            <br />
                            {filteredTasks.filter(x => x.status === Status.Open).map(x => { console.log(filteredTasks); return <TaskCard {...x}></TaskCard> })}
                        </div>
                        <div>
                            <Text block variant='medium' style={{ fontWeight: 'bold' }}>In progres</Text>
                            <StudentCard>
                                <ActionButton iconProps={addIcon} allowDisabledFocus style={{ color: 'green' }} onClick={() => openAddProgressTask()}>Add Task</ActionButton>
                            </StudentCard>
                            {addProgressTaskClicked && <Addtask status={Status.InProgress} addParentCall={addParentCall} />
                            }
                            <br />
                            {filteredTasks.filter(x => x.status === Status.InProgress).map(x => { return <TaskCard {...x}></TaskCard> })}
                        </div>
                        <div>
                            <Text block variant='medium' style={{ fontWeight: 'bold' }}>Completed</Text>
                            <StudentCard>
                                <ActionButton iconProps={addIcon} allowDisabledFocus style={{ color: 'green' }} onClick={() => openAddCompleteTask()}>Add Task</ActionButton>
                            </StudentCard>
                            {addCompleteTaskClicked && <Addtask status={Status.Completed} addParentCall={addParentCall} />
                            }
                            <br />
                            {filteredTasks.filter(x => x.status === Status.Completed).map(x => { return <TaskCard {...x}></TaskCard> })}
                        </div>
                    </Stack>
                </div>
            }
            </>
        );
    }
}

export default Board;
