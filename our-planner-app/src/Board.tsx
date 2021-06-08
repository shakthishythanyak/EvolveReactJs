import React, { useEffect, useState, useImperativeHandle } from 'react';
import styled from 'styled-components';
import { IIconProps, ActionButton, Text, Stack, IStackStyles, Calendar, PrimaryButton } from '@fluentui/react';
import { Addtask } from './components/task/addtask';
import { ITaskInfo, Status } from './Interfaces/task/ITaskInfo';
import { TaskCard } from './components/taskCard/taskCard';
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
    width: 350px;
    margin-left: 1px;
`;

export let initialTasks: ITaskInfo[] = [
    {
        id: 1,
        taskName: "Submit Mini Project",
        desc: "To do",
        start: new Date(new Date(Date.now()).setDate(new Date(Date.now()).getDate() + 3)),
        end: new Date(new Date(Date.now()).setDate(new Date(Date.now()).getDate() + 3)),
        status: Status.InProgress,
        assigned: "Shakthi"
    },
    {
        id: 2,
        taskName: "Test Mini Project Modules",
        desc: "To do",
        start: new Date(new Date(Date.now()).setDate(new Date(Date.now()).getDate() + 2)),
        end: new Date(new Date(Date.now()).setDate(new Date(Date.now()).getDate() + 2)),
        status: Status.InProgress,
        assigned: "Shakthi"
    },
    {
        id: 3,
        taskName: "Review Mini Project Design",
        desc: "To do",
        start: new Date(new Date(Date.now()).setDate(new Date(Date.now()).getDate() + 1)),
        end: new Date(new Date(Date.now()).setDate(new Date(Date.now()).getDate() + 1)),
        status: Status.Completed,
        assigned: "Shakthi"
    },
    {
        id: 4,
        taskName: "Complete Mini Project Implementation",
        desc: "To do",
        start: new Date(new Date(Date.now()).setDate(new Date(Date.now()).getDate() - 1)),
        end: new Date(new Date(Date.now()).setDate(new Date(Date.now()).getDate() - 1)),
        status: Status.Completed,
        assigned: "Shakthi"
    },
    {
        id: 5,
        taskName: "Review Project implementation by Panels",
        desc: "To do",
        start: new Date(Date.now()),
        end: new Date(Date.now()),
        status: Status.Open,
        assigned: "Shakthi"
    },
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
    AppliedFilter: string;
    parentCallback: (tasks: ITaskInfo[]) => void;
}

var viewdetails = "Progress";
var selectedFilters: string[] = [];
var filteredDescription: string;
type Props = IBoardProps;

export function Board(props: Props) {
    const [addOpenTaskClicked, setAddOpenTaskClicked] = useState<Boolean>(false);
    const [addProgressTaskClicked, setAddProgressTaskClicked] = useState<Boolean>(false);
    const [addCompleteTaskClicked, setAddCompleteTaskClicked] = useState<Boolean>(false);
    const [addLateTaskClicked, setAddLateTaskClicked] = useState<Boolean>(false);
    const [addTodayTaskClicked, setAddTodayTaskClicked] = useState<Boolean>(false);
    const [addTomorrowTaskClicked, setAddTomorrowTaskClicked] = useState<Boolean>(false);
    const [addThisWeekTaskClicked, setAddThisWeekTaskClicked] = useState<Boolean>(false);
    const [addNextWeekTaskClicked, setAddNextWeekTaskClicked] = useState<Boolean>(false);
    const [addFutureTaskClicked, setAddFutureTaskClicked] = useState<Boolean>(false);
    const [addNoDateTaskClicked, setAddNoDateTaskClicked] = useState<Boolean>(false);
    const [initialTaskData, setInitialTasks] = useState<ITaskInfo[]>(initialTasks);
    const [filteredTasks, setFilteredTasks] = useState<ITaskInfo[]>(initialTasks);
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

    }, [selectedFilters.length, filteredDescription, initialTasks.length]);

    if (viewdetails != props.SelectedView && props.SelectedView != '') {
        viewdetails = props.SelectedView;
    }
    if (filteredDescription != props.AppliedFilter) {
        filteredDescription = props.AppliedFilter;
        console.log(filteredDescription);
    }
    const getFilteredTasks = () => {
        let tempFilteredTasks: ITaskInfo[] = [];
        setFilteredTasks([]);
        console.log("Entered Else");
        if (selectedFilters.length !== 0) {

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

            if (selectedFilters.includes("notStarted")) {
                initialCount = filteredTasks.length;
                initialTasks.filter(x => x.status == Status.Open).map(x => tempFilteredTasks.push(x));
            }
            if (selectedFilters.includes("inProgress")) {
                initialCount = filteredTasks.length;
                initialTasks.filter(x => x.status === Status.InProgress).map(x => tempFilteredTasks.push(x));
            }
            if (selectedFilters.includes("completed")) {
                initialCount = filteredTasks.length;
                initialTasks.filter(x => x.status === Status.Completed).map(x => tempFilteredTasks.push(x));
            }
        }
        if (filteredDescription !== '' && filteredDescription !== undefined && tempFilteredTasks.length !== 0) {
            console.log(filteredDescription);
            setFilteredTasks(tempFilteredTasks.filter(x => x.taskName.toUpperCase().match(String(filteredDescription).toUpperCase())));
            console.log("Reshma Testing here");
            console.log(String(filteredDescription).toUpperCase());
        }
        else if (filteredDescription !== '' && filteredDescription !== undefined && tempFilteredTasks.length == 0) {
            console.log(filteredDescription);
            setFilteredTasks(initialTasks.filter(x => x.taskName.toUpperCase().match(String(filteredDescription).toUpperCase())));
            console.log("Reshma Testing here");
            console.log(String(filteredDescription).toUpperCase());
        }
        else if (tempFilteredTasks.length !== 0) {
            setFilteredTasks(tempFilteredTasks);
        }
        else if (tempFilteredTasks.length === 0 && selectedFilters.length !== 0) {
            setFilteredTasks([]);
        }
        else {
            console.log(filteredDescription);
            setFilteredTasks([]);
            setFilteredTasks(initialTasks);
        }

    }

    var initialCount: Number = initialTasks.length;

    const openAddOpenTask = () => {
        let temp = !addOpenTaskClicked;
        setAddOpenTaskClicked(temp);
    }

    const openAddProgressTask = () => {
        let temp = !addProgressTaskClicked;
        setAddProgressTaskClicked(temp);
    }

    const openAddCompleteTask = () => {
        let temp = !addCompleteTaskClicked;
        setAddCompleteTaskClicked(temp);
    }

    const openAddLateTask = () => {
        let temp = !addLateTaskClicked;
        setAddLateTaskClicked(temp);
    }

    const openAddTodayTask = () => {
        let temp = !addTodayTaskClicked;
        setAddTodayTaskClicked(temp);
    }

    const openAddTomorrowTask = () => {
        let temp = !addTomorrowTaskClicked;
        setAddTomorrowTaskClicked(temp);
    }

    const openAddThisWeekTask = () => {
        let temp = !addThisWeekTaskClicked;
        setAddThisWeekTaskClicked(temp);
    }
    const openAddNextWeekTask = () => {
        let temp = !addNextWeekTaskClicked;
        setAddNextWeekTaskClicked(temp);
    }

    const openAddFutureTask = () => {
        let temp = !addFutureTaskClicked;
        setAddFutureTaskClicked(temp);
    }

    const openAddNoDateTask = () => {
        let temp = !addNoDateTaskClicked;
        setAddNoDateTaskClicked(temp);
    }
    const addParentCall = (task: ITaskInfo) => {
        //setAddTaskFinal(true);
        initialCount = initialTasks.length;
        task.id = initialTasks.length + 1;
        console.log(initialTasks);
        console.log(task);
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
        props.parentCallback(initialTasks);
    }
    const updateParentCall = (task: ITaskInfo) => {
        initialTasks = initialTasks.filter(x => x.id !== task.id);

        initialTasks.push(task);
        setInitialTasks(initialTasks);
        getFilteredTasks();
    }
    if (viewdetails == "DueDate") {
        console.log(viewdetails + "122")
        return (<>
            {
                <div style={{ overflow: 'scroll', width: '93vw', height: '40vw' }}>
                    <Stack horizontal tokens={{ childrenGap: 50 }} styles={stackStyles}>
                        <div className="students">
                            <Text block variant='medium' style={{ fontWeight: 'bold' }}>Late</Text>
                            <StudentCard>
                                <ActionButton iconProps={addIcon} allowDisabledFocus style={{ color: 'green' }} onClick={() => openAddLateTask()}>Add Task</ActionButton>
                            </StudentCard>
                            {addLateTaskClicked && <Addtask date="late" status={Status.Open} addParentCall={addParentCall} />
                            }
                            <br />
                            {filteredTasks.filter(x => x.status === Status.Open && x.end.setHours(0, 0, 0, 0) < new Date(Date.now()).setHours(0, 0, 0, 0) && x.end.setHours(0, 0, 0, 0) != new Date(2000, 1, 1).setHours(0, 0, 0, 0)).map(x => { return <TaskCard taskInfo={x} updateParentCall={updateParentCall}></TaskCard> })}
                        </div>
                        <div>
                            <Text block variant='medium' style={{ fontWeight: 'bold' }}>Today</Text>
                            <StudentCard>
                                <ActionButton iconProps={addIcon} allowDisabledFocus style={{ color: 'green' }} onClick={() => openAddTodayTask()}>Add Task</ActionButton>
                            </StudentCard>
                            {addTodayTaskClicked && <Addtask date="today" status={Status.Open} addParentCall={addParentCall} />
                            }
                            <br />
                            {filteredTasks.filter(x => x.status === Status.Open && x.end.setHours(0, 0, 0, 0) === new Date(Date.now()).setHours(0, 0, 0, 0)).map(x => { return <TaskCard taskInfo={x} updateParentCall={updateParentCall}></TaskCard> })}
                        </div>
                        <div>
                            <Text block variant='medium' style={{ fontWeight: 'bold' }}>Tomorrow</Text>
                            <StudentCard>
                                <ActionButton iconProps={addIcon} allowDisabledFocus style={{ color: 'green' }} onClick={() => openAddTomorrowTask()}>Add Task</ActionButton>
                            </StudentCard>
                            {addTomorrowTaskClicked && <Addtask date="tomorrow" status={Status.Open} addParentCall={addParentCall} />
                            }
                            <br />
                            {filteredTasks && filteredTasks.filter(x => x.status === Status.Open && x.end.setHours(0, 0, 0, 0) === new Date(Date.now()).next().day().setHours(0, 0, 0, 0)).map(x => { return <TaskCard taskInfo={x} updateParentCall={updateParentCall}></TaskCard> })}
                        </div>
                        <div>
                            <Text block variant='medium' style={{ fontWeight: 'bold' }}>This Week</Text>
                            <StudentCard>
                                <ActionButton iconProps={addIcon} allowDisabledFocus style={{ color: 'green' }} onClick={() => openAddThisWeekTask()}>Add Task</ActionButton>
                            </StudentCard>
                            {addThisWeekTaskClicked && <Addtask date="thisWeek" status={Status.Open} addParentCall={addParentCall} />
                            }
                            <br />
                            {filteredTasks && filteredTasks.filter(x => x.status === Status.Open && x.end.setHours(0, 0, 0, 0) > new Date(Date.now()).next().day().setHours(0, 0, 0, 0) && (x.end.setHours(0, 0, 0, 0) < new Date(Date.now()).next().sunday().setHours(0, 0, 0, 0))).map(x => { return <TaskCard taskInfo={x} updateParentCall={updateParentCall}></TaskCard> })}
                        </div>
                        <div>
                            <Text block variant='medium' style={{ fontWeight: 'bold' }}>Next Week</Text>
                            <StudentCard>
                                <ActionButton iconProps={addIcon} allowDisabledFocus style={{ color: 'green' }} onClick={() => openAddNextWeekTask()}>Add Task</ActionButton>
                            </StudentCard>
                            {addNextWeekTaskClicked && <Addtask date="nextWeek" status={Status.Open} addParentCall={addParentCall} />
                            }
                            <br />
                            {filteredTasks && filteredTasks.filter(x => x.status === Status.Open && x.end.setHours(0, 0, 0, 0) >= new Date(Date.now()).next().sunday().setHours(0, 0, 0, 0) && x.end.setHours(0, 0, 0, 0) < new Date(Date.now()).next().sunday().addDays(7).setHours(0, 0, 0, 0)).map(x => { return <TaskCard taskInfo={x} updateParentCall={updateParentCall}></TaskCard> })}
                        </div>
                        <div>
                            <Text block variant='medium' style={{ fontWeight: 'bold' }}>Future</Text>
                            <StudentCard>
                                <ActionButton iconProps={addIcon} allowDisabledFocus style={{ color: 'green' }} onClick={() => openAddFutureTask()}>Add Task</ActionButton>
                            </StudentCard>
                            {addFutureTaskClicked && <Addtask date="future" status={Status.Open} addParentCall={addParentCall} />
                            }
                            <br />
                            {filteredTasks && filteredTasks.filter(x => x.status === Status.Open && x.end.setHours(0, 0, 0, 0) >= new Date(Date.now()).next().sunday().addDays(7).setHours(0, 0, 0, 0)).map(x => { return <TaskCard taskInfo={x} updateParentCall={updateParentCall}></TaskCard> })}
                        </div>
                        <div>
                            <Text block variant='medium' style={{ fontWeight: 'bold' }}>No Date</Text>
                            <StudentCard>
                                <ActionButton iconProps={addIcon} allowDisabledFocus style={{ color: 'green' }} onClick={() => openAddNoDateTask()}>Add Task</ActionButton>
                            </StudentCard>
                            {addNoDateTaskClicked && <Addtask date="noDate" status={Status.Open} addParentCall={addParentCall} />
                            }
                            <br />
                            {filteredTasks && filteredTasks.filter(x => x.status === Status.Open && x.end.setHours(0, 0, 0, 0) === new Date(2000, 1, 1).setHours(0, 0, 0, 0)).map(x => { return <TaskCard taskInfo={x} updateParentCall={updateParentCall}></TaskCard> })}
                        </div>
                    </Stack>
                </div>
            }
        </>)
    }
    else {

        return (
            <>{
                <div style={{ overflow: 'scroll', width: '93vw', height: '40vw' }}>
                    <Stack horizontal tokens={{ childrenGap: 100 }} styles={stackStyles}>
                        <div className="students">
                            <Text block variant='medium' style={{ fontWeight: 'bold' }}>Not started</Text>
                            <StudentCard>
                                <ActionButton iconProps={addIcon} allowDisabledFocus style={{ color: 'green' }} onClick={() => openAddOpenTask()}>Add Task</ActionButton>
                            </StudentCard>
                            {addOpenTaskClicked && <Addtask date="progress" status={Status.Open} addParentCall={addParentCall} />
                            }
                            <br />
                            {filteredTasks.filter(x => x.status === Status.Open).map(x => { console.log(filteredTasks); return <TaskCard taskInfo={x} updateParentCall={updateParentCall}></TaskCard> })}
                        </div>
                        <div>
                            <Text block variant='medium' style={{ fontWeight: 'bold' }}>In progres</Text>
                            <StudentCard>
                                <ActionButton iconProps={addIcon} allowDisabledFocus style={{ color: 'green' }} onClick={() => openAddProgressTask()}>Add Task</ActionButton>
                            </StudentCard>
                            {addProgressTaskClicked && <Addtask date="progress" status={Status.InProgress} addParentCall={addParentCall} />
                            }
                            <br />
                            {filteredTasks.filter(x => x.status === Status.InProgress).map(x => { return <TaskCard taskInfo={x} updateParentCall={updateParentCall}></TaskCard> })}
                        </div>
                        <div>
                            <Text block variant='medium' style={{ fontWeight: 'bold' }}>Completed</Text>
                            <StudentCard>
                                <ActionButton iconProps={addIcon} allowDisabledFocus style={{ color: 'green' }} onClick={() => openAddCompleteTask()}>Add Task</ActionButton>
                            </StudentCard>
                            {addCompleteTaskClicked && <Addtask date="progress" status={Status.Completed} addParentCall={addParentCall} />
                            }
                            <br />
                            {filteredTasks.filter(x => x.status === Status.Completed).map(x => { return <TaskCard taskInfo={x} updateParentCall={updateParentCall}></TaskCard> })}
                        </div>
                    </Stack>
                </div>
            }
            </>
        );
    }
}

export default Board;
