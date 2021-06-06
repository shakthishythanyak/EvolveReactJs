import { Stack, TextField, ActionButton, PrimaryButton, IStackStyles, DefaultPalette, IIconProps, Icon, DefaultButton, Callout, DirectionalHint, FocusTrapZone, Calendar, IIconStyles, DefaultFontStyles, DefaultEffects, ColorPicker, rgb2hsv, rgb2hex, CommandBarButton, IContextualMenuProps, Dropdown, IDropdownOption, IDropdownStyles, DropdownMenuItemType, IImageProps, ImageFit, Facepile, IFacepileProps, PersonaInitialsColor, IFacepilePersona, ISelectableOption, IRenderFunction, ISelectableDroppableTextProps, mergeStyleSets, PersonaSize, IStackTokens } from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';
import React from 'react';
import { ITaskInfo, Status } from '../../Interfaces/task/ITaskInfo';
import './task.css'
import { TaskCard } from '../taskCard/taskCard';
import { testFunct } from '../../Board';

interface propFromDispatch {
  addParentCall: (task: ITaskInfo) => void;
}
// const mapStateToProps = () => ({
//   initialTasks: initialTasks
// });
const mapStatusStateToProps = (status: Status) => ({
  status: status
});
// type Props = ReturnType<typeof mapStatusStateToProps> & ReturnType<typeof mapStateToProps> & propFromDispatch;
type Props = ReturnType<typeof mapStatusStateToProps> & propFromDispatch;
export const Addtask: React.FC<Props> = ({ status, addParentCall }) => {
  const stackStyles: IStackStyles = {
    root: {
      height: 200,
      background: DefaultPalette.themeTertiary,
      overflow: 'hidden',
      width: 300,
    },
  };
  const horizontalGapStackTokens: IStackTokens = {
    childrenGap: 10,
  };
  const iconStyles: IIconStyles = {
    root: {
      color: 'gray',
      fontSize: 'large'
    },
  };
  const iconAssigneeStyles: IIconStyles = {
    root: {
      color: 'gray',
      paddingLeft: '2px',
      fontSize: 'large'
    },
  };
  const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { width: 300 },
  };

  const options: IDropdownOption[] = [
    { key: 'Shakthi', text: 'Shakthi Shythanya' }
    // { key: 'Reshma', text: 'Reshma V' },
    // { key: 'Braja', text: 'Braja' }
  ];
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

  const setInitialFacePileState = (): IFacepileProps => {
    var currentUser = "Shakthi";
    var facepersonas = facepileProps.personas.filter(x => x.data === currentUser);
    var newFacepileTotal = { personas: facepersonas };
    return newFacepileTotal;
  }

  const calendarIcon: IIconProps = { iconName: 'Calendar', styles: iconStyles };
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date(2000, 1, 1));
  const [toggle, setToggle] = React.useState<Boolean>();
  const [isCalloutVisible, { toggle: toggleIsCalloutVisible, setFalse: hideCallout }] = useBoolean(false);
  const [selectedValue, setSelectedValue] = React.useState<string>();
  const [selectedFacePile, setSelectedFacePile] = React.useState<IFacepileProps>(() => setInitialFacePileState());
  const [isSelValue, setisSelValue] = React.useState<Boolean>();
  const [taskName, setTaskNameValue] = React.useState<string>("");
  const [showCalendar, { toggle: toggleShowCalendar, setFalse: hideCalendar }] = useBoolean(false);
  const buttonContainerRef = React.useRef<HTMLDivElement>(null);
  const actionContainerRef = React.useRef<HTMLDivElement>(null);
  const [imagesFadeIn, { toggle: toggleImagesFadeIn }] = useBoolean(true);

  const handleChange = (e: React.FormEvent<HTMLDivElement>, dOption: IDropdownOption) => {
    setisSelValue(true);
    setSelectedValue(options.find((s) => s.key == dOption.key)?.text.toString());
    setToggle(!toggleIsCalloutVisible);
    var facepersonas = facepileProps.personas.filter(x => x.data === dOption.key);
    var newFacepileTotal = { personas: facepersonas };
    setSelectedFacePile(newFacepileTotal);
  }

  const onSelectDate = React.useCallback(
    (date: Date): Date => {
      setSelectedDate(date);
      hideCalendar();
      return date;
    },
    [hideCalendar],
  );
  var task: ITaskInfo;
  const addTask = () => {
    const taskToBeAdded = JSON.stringify({ taskName, end: selectedDate, status, assigned: selectedValue });
    task =
    {
      id: 5,
      taskName: taskName,
      start: selectedDate,
      end: selectedDate,
      status: status,
      assigned: "Shakthi"
    }
    //task = JSON.parse(taskToBeAdded);
    //initialTasks.push(task);
    addParentCall(task);
    //console.log(initialTasks);
  }

  return (<>
    <Stack styles={stackStyles} style={{ backgroundColor: 'white', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', margin: '2px 2px 2px 2px' }}>
      <Stack horizontal disableShrink tokens={horizontalGapStackTokens}>
        <Icon iconName="LocationCircle" className="icon" />
        <span className="textControl">
          <TextField
            id="taskName"
            name="taskName"
            onChange={evt => setTaskNameValue(evt.currentTarget.value)}
            placeholder="Enter a task name"
            borderless
            style={{ backgroundColor: '#EFEEEE', borderBottom: '2px solid', borderColor: 'green' }}
          />
        </span>
      </Stack>
      <Stack horizontal disableShrink tokens={horizontalGapStackTokens}>
        <Icon iconName="Taskboard" className="icon" />
        <span className="textDescription">
          To do
            </span>
      </Stack>
      <Stack horizontal disableShrink tokens={horizontalGapStackTokens}>
        <div ref={buttonContainerRef}>
          <DefaultButton
            style={{ paddingLeft: '5px', paddingTop: '10px', borderStyle: 'none', textDecoration: 'right' }}
            iconProps={calendarIcon}
            onClick={toggleShowCalendar}
            name="dueDate"
            id="dueDate"
            text={!selectedDate ? 'Set due date' : selectedDate.toLocaleDateString()}>
          </DefaultButton>
        </div>
        {showCalendar && (
          <Callout
            isBeakVisible={false}
            gapSpace={0}
            doNotLayer={false}
            target={buttonContainerRef}
            directionalHint={DirectionalHint.bottomLeftEdge}
            onDismiss={hideCalendar}
            setInitialFocus
          >
            <FocusTrapZone isClickableOutsideFocusTrap>
              <Calendar
                onSelectDate={onSelectDate}
                onDismiss={hideCalendar}
                isMonthPickerVisible
                value={selectedDate}
                highlightCurrentMonth
                isDayPickerVisible
                showGoToToday
              />
            </FocusTrapZone>
          </Callout>
        )}
      </Stack>
      <Stack horizontal disableShrink tokens={horizontalGapStackTokens}>
        <div ref={actionContainerRef}>
          {!isSelValue &&
            <ActionButton onClick={toggleIsCalloutVisible}>
              <Icon iconName="AddFriend" styles={iconAssigneeStyles} />
              <span className="assigneeControl">
                &nbsp; Assign
                  </span>
            </ActionButton>
          }
        </div>
        {isSelValue && (<>
          <div className="textDescription">
            <Facepile {...selectedFacePile} styles={{ root: { paddingTop: '-2px', color: rgb2hex(128, 128, 128), fontSize: '16px !important' } }} />
          </div>
        </>)}
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
              <Dropdown
                defaultSelectedKey={options.find((s) => s.text === "Shakthi")?.key?.toString()}
                selectedKey={options.find((s) => s.text)?.key?.toString()}
                options={options}
                onChange={(e, selectedOption) => {
                  selectedOption && handleChange(e, selectedOption);
                }}
                styles={dropdownStyles}
                onDismiss={hideCallout}
              />
            </FocusTrapZone>
          </Callout>
        )}
      </Stack>
      <div style={{ paddingTop: '5px' }}></div>
      <div className="buttonWrapper">
        <PrimaryButton style={{ backgroundColor: 'green', height: '51px' }} onClick={addTask}>
          AddTask
      </PrimaryButton>
      </div>
    </Stack>
  </>
  );


}



