import React from 'react';
import styled from 'styled-components';
import {IIconProps, ActionButton,Text, Stack, IStackStyles, Calendar} from '@fluentui/react';

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

export const Board: React.FunctionComponent = () => {
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
        <ActionButton iconProps={addIcon} allowDisabledFocus style ={{color :'green'}}>Add Task</ActionButton>
        </StudentCard>
        </div>
        <div>
        <Text block variant ='medium' style ={{fontWeight:'bold'}}>Completed</Text>
        <StudentCard>
        <ActionButton iconProps={addIcon} allowDisabledFocus style ={{color :'green'}}>Add Task</ActionButton>
        </StudentCard>
        </div>
    </Stack>
</div>
    );
}

export default Board;