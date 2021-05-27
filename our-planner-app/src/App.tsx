import React, { useState } from 'react';
import './App.css';
import { Addtask } from './components/task/addtask';
import { ITaskInfo, Status } from './Interfaces/task/ITaskInfo';
import { TaskCard } from './components/taskCard/taskCard';
import { DefaultButton, PrimaryButton } from '@fluentui/react';

type Props = { parentCallback(task: ITaskInfo): void };
function App() {
  const taskAdded = (task: ITaskInfo) => {
    console.log(task);

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
  const [addTaskClicked, setAddTaskClicked] = React.useState<Boolean>(false);
  const openAddTask = () => {
    setAddTaskClicked(true);
  }
  const addParentCall = () => {
    console.log("Called");
  }

  return (
    <>
      <div style={{ padding: '5px 5px 5px 5px' }}>
        <PrimaryButton onClick={openAddTask}></PrimaryButton>
      </div>
    </>
  );
}




export default App;
