import { DefaultPalette, Facepile, Icon, IFacepileProps, IIconStyles, IStackStyles, IStackTokens, PersonaInitialsColor, rgb2hex, Stack } from "@fluentui/react";
import React, { useState } from "react";
import { ITaskInfo, Status } from "../../Interfaces/task/ITaskInfo";
import './taskCard.css';

export function TaskCard(taskInfo:ITaskInfo)
{
    var isStriked = false;
    var isOverDue = false;
    var imageToDisplay = "LocationCircle";
    var className = "iconOpen";
    var taskStatusDesc = "";
    var taskAssigneProgress = "";

    const horizontalGapStackTokens: IStackTokens = {
        childrenGap: 10,
        padding: 8,
      };
    
    const stackStyles: IStackStyles = {
        root: {
          height:170,
          width: 400
        }
      };
      const facepileProps: IFacepileProps = {
        personas: [
          {            
            data:'Shakthi',
            personaName: 'Shakthi Shythanya',
            imageUrl: '//www.fillmurray.com/200/200'            
          },
          {
            data:'Reshma',
            personaName: 'Reshma V',
            imageInitials: 'RV',
            initialsColor: PersonaInitialsColor.green
          },
          {data:'Braja',
            personaName: 'Braja Das',
            imageInitials: 'BD',
            initialsColor: PersonaInitialsColor.purple
          }
        ]
      };
      const getStatus =(): string =>
      {
         if(taskInfo.status === 0)
         {return "Open";}
         else 
         if(taskInfo.status === 1)
         {return "In progress";}         
         else 
         {return "Completed";}

      }
      const getFacePile = () : IFacepileProps =>
      {
        var facepersonas = facepileProps.personas.filter(x=>x.data === taskInfo.assigned);
        facepersonas[0].personaName = getStatus() + " by " + facepersonas[0].personaName;
        var newFacepileTotal = { personas:facepersonas};
        return newFacepileTotal;
      }
      const getFirstName = () =>
      {
        var lastSpaceElm = taskInfo.assigned.indexOf(" ");
        var firstName = lastSpaceElm !== -1 ? taskInfo.assigned.substr(0,lastSpaceElm): taskInfo.assigned;
        return firstName
      }
      const getInfoByTaskStatus = () =>
      {
          var currentDate = new Date(Date.now());
          var statusText = getStatus();
          console.log(statusText);
          if(taskInfo.end > currentDate)
          {
              isOverDue = true;
              console.log(isOverDue);
          }
          taskStatusDesc = isOverDue ? getFirstName() + "'s planner overdue task" : getFirstName() + "'s planner " + statusText + " task"; 
          if(taskInfo.status == Status.Open)
          {
              imageToDisplay = "LocationCircle";
              className = "iconOpen"            
              isStriked = false;
              taskAssigneProgress = "open task with"
        }  
        else if(taskInfo.status == Status.Completed)
        {    
            imageToDisplay = "CompletedSolid";
            className = "iconCompleted"            
            isStriked = true;
            taskAssigneProgress = "Completed by"
        }
        else if(taskInfo.status == Status.InProgress)
        {
            isStriked = false;
            imageToDisplay = "CircleHalfFull";
            className ="iconInProgress";
            taskAssigneProgress = "In progress with"            
        }
      }     
       getInfoByTaskStatus();
       var facePile = getFacePile();
    return <>
    <Stack styles={stackStyles}  style={{backgroundColor:'white',boxShadow :'rgba(0, 0, 0, 0.35) 0px 5px 15px', margin:'2px 2px 2px 2px'}}>
        <Stack horizontal disableShrink tokens={horizontalGapStackTokens}>
            <Icon iconName={imageToDisplay} className={className} />
            <span className="tasktextDescription" style={isStriked?{textDecoration:"line-through"}:{}}>{taskStatusDesc}</span>
        </Stack>
        <Stack horizontal disableShrink tokens={horizontalGapStackTokens}>
            <Icon />
            <span className="tasktextDescription" style={{color:"green"}}>{taskInfo.desc}</span>
        </Stack>
       
        <Stack horizontal disableShrink tokens={horizontalGapStackTokens} >
            <div style={isOverDue? {backgroundColor:'red'}:{}}>
                <Icon iconName="Calendar" className="iconOpen" /> 
                <span className="tasktextDescription">&nbsp;{taskInfo.end.toLocaleDateString()}</span>
            </div>
        </Stack>
        <hr style={{width:'100%', color:'gray'}}></hr>
        <Stack horizontal disableShrink tokens={horizontalGapStackTokens}>
            <span className="tasktextDescription">  <Facepile {...facePile} styles={{root:{color: rgb2hex(128,128,128),fontSize:'16px !important'}}} /></span>
        </Stack> 
    </Stack> 

            
        </>
}