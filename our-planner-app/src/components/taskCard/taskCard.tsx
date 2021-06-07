import { Callout, CommandBarButton, CommandButton, DirectionalHint, Dropdown, Facepile, FocusTrapZone, Icon, IContextualMenuItem, IContextualMenuProps, IDropdownOption, IDropdownStyles, IFacepileProps, IIconStyles, IStackStyles, IStackTokens, PersonaInitialsColor, rgb2hex, Stack } from "@fluentui/react";
import { useBoolean } from "@fluentui/react-hooks";
import React, { useState } from "react";
import { ITaskInfo, Status } from "../../Interfaces/task/ITaskInfo";
import './taskCard.css';

interface propFromDispatch {
  updateParentCall: (task: ITaskInfo) => void;
}
const mapTaskInfoToProps = (taskInfo: ITaskInfo) => ({
  taskInfo: taskInfo
});

type Props = ReturnType<typeof mapTaskInfoToProps> & propFromDispatch;
export const TaskCard: React.FC<Props> = ({ taskInfo, updateParentCall }) => {
  //export const TaskCard: React.FC<Props> = ({ taskInfo }) => {
  var isStriked = false;
  var isOverDue = false;
  var imageToDisplay = "LocationCircle";
  var className = "iconOpen";
  var taskStatusDesc = "";
  var taskAssigneProgress = "";
  const [isCalloutVisible, { toggle: toggleIsCalloutVisible, setFalse: hideCallout }] = useBoolean(false);
  const actionContainerRef = React.useRef<HTMLDivElement>(null);
  const horizontalGapStackTokens: IStackTokens = {
    childrenGap: 10,
    padding: 8,
  };
  const stackStyles: IStackStyles = {
    root: {
      height: 170,
      width: 350
    }
  };
  const facepileProps: IFacepileProps = {
    personas: [
      {
        data: 'Shakthi',
        personaName: 'Shakthi Shythanya',
        imageUrl: '//www.fillmurray.com/200/200'
      },
      {
        data: 'Reshma',
        personaName: 'Reshma V',
        imageInitials: 'RV',
        initialsColor: PersonaInitialsColor.green
      },
      {
        data: 'Braja',
        personaName: 'Braja Das',
        imageInitials: 'BD',
        initialsColor: PersonaInitialsColor.purple
      }
    ]
  };
  const getStatus = (): string => {
    if (taskInfo.status === 0) { return "Open"; }
    else
      if (taskInfo.status === 1) { return "In progress"; }
      else { return "Completed"; }

  }

  const getFacePile = (): IFacepileProps => {
    var lastSpaceElm = taskInfo.assigned.indexOf(" ");
    var firstName = lastSpaceElm !== -1 ? taskInfo.assigned.substr(0, lastSpaceElm) : taskInfo.assigned;

    var facepersonas = facepileProps.personas.filter(x => x.data === firstName);
    facepersonas[0].personaName = getStatus() + " by " + facepersonas[0].personaName;
    var newFacepileTotal = { personas: facepersonas };
    return newFacepileTotal;
  }
  const getFirstName = () => {
    var lastSpaceElm = taskInfo.assigned.indexOf(" ");
    var firstName = lastSpaceElm !== -1 ? taskInfo.assigned.substr(0, lastSpaceElm) : taskInfo.assigned;
    return firstName
  }
  const getInfoByTaskStatus = () => {
    var currentDate = new Date(new Date(Date.now()).setHours(0, 0, 0, 0));
    var statusText = getStatus();
    if (taskInfo.end < currentDate) {
      isOverDue = true;
    }

    // taskStatusDesc = isOverDue ? getFirstName() + "'s planner overdue task" : getFirstName() + "'s planner " + statusText + " task";
    if (taskInfo.status == Status.Open) {
      imageToDisplay = "LocationCircle";
      className = "iconOpen"
      isStriked = false;
      taskAssigneProgress = "open task with"
    }
    else if (taskInfo.status == Status.Completed) {
      imageToDisplay = "CompletedSolid";
      className = "iconCompleted"
      isStriked = true;
      taskAssigneProgress = "Completed by"
    }
    else if (taskInfo.status == Status.InProgress) {
      isStriked = false;
      imageToDisplay = "CircleHalfFull";
      className = "iconInProgress";
      taskAssigneProgress = "In progress with";
    }
  }

  const filterApplied = (selectedVal: string) => {
    //let selectedVal: string = item !== undefined ? item.key : "";
    taskInfo.status = selectedVal === "notStarted" ? Status.Open : selectedVal === "inProgress" ? Status.InProgress : Status.Completed;
    toggleIsCalloutVisible();
    updateParentCall(taskInfo);
  }

  getInfoByTaskStatus();
  var facePile = getFacePile();
  return <>
    <Stack styles={stackStyles} style={{ backgroundColor: 'white', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', margin: '2px 2px 2px 2px' }}>
      <Stack horizontal disableShrink tokens={horizontalGapStackTokens}>
        <div ref={actionContainerRef}><Icon iconName={imageToDisplay} className={className} onClick={toggleIsCalloutVisible} /></div>
        <span className="tasktextDescription" style={isStriked ? { textDecoration: "line-through" } : {}}>{taskInfo.taskName}</span>
        {isCalloutVisible && (
          <Callout
            isBeakVisible={false}
            gapSpace={0}
            doNotLayer={false}
            target={actionContainerRef}
            directionalHint={DirectionalHint.bottomRightEdge}
            onDismiss={hideCallout}
            setInitialFocus
          >
            <FocusTrapZone isClickableOutsideFocusTrap>
              <table>
                <tr>
                  <CommandBarButton iconProps={{ iconName: 'StatusCircleRing', style: { color: 'gray' } }} className="listButtonText" onClick={(e) => filterApplied("notStarted")}>
                    <td style={{ width: '200px', paddingLeft: '15px', textAlign: 'left', fontSize: 'large' }}>Not Started</td>
                  </CommandBarButton>
                </tr>
                <tr>
                  <CommandBarButton iconProps={{ iconName: 'CircleHalfFull' }} className="listButtonText" onClick={(e) => filterApplied("inProgress")}>
                    <td style={{ width: '200px', paddingLeft: '15px', textAlign: 'left', fontSize: 'large' }}>In Progress</td>
                  </CommandBarButton>
                </tr>
                <tr>
                  <CommandBarButton iconProps={{ iconName: 'CompletedSolid', style: { color: 'green' } }} className="listButtonText" onClick={(e) => filterApplied("completed")}>
                    <td style={{ width: '200px', paddingLeft: '15px', textAlign: 'left', fontSize: 'large' }}>Completed</td>
                  </CommandBarButton>
                </tr>
              </table>

            </FocusTrapZone>
          </Callout>
        )}
      </Stack>
      <Stack horizontal disableShrink tokens={horizontalGapStackTokens}>
        <Icon />
        <span className="tasktextDescription" style={{ color: "green" }}>{taskInfo.desc}</span>
      </Stack>

      <Stack horizontal disableShrink tokens={horizontalGapStackTokens} >
        <div style={isOverDue ? { backgroundColor: 'red' } : {}}>
          <Icon iconName="Calendar" className="iconOpen" />
          <span className="tasktextDescription">&nbsp;{taskInfo.end.setHours(0, 0, 0, 0) === new Date(2000, 1, 1).setHours(0, 0, 0, 0) ? 'No Date' : taskInfo.end.toLocaleDateString()}</span>
        </div>
      </Stack>
      <hr style={{ width: '100%', color: 'gray' }}></hr>
      <Stack horizontal disableShrink tokens={horizontalGapStackTokens}>
        <span className="tasktextDescription">  <Facepile {...facePile} styles={{ root: { color: rgb2hex(128, 128, 128), fontSize: '16px !important' } }} /></span>
      </Stack>
    </Stack>
    <br />


  </>
}