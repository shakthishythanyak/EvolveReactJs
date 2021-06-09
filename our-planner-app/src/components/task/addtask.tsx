import { Stack, TextField, ActionButton, PrimaryButton, IStackStyles, DefaultPalette, IIconProps, Icon, DefaultButton, Callout, DirectionalHint, FocusTrapZone, Calendar, IIconStyles, DefaultFontStyles, DefaultEffects, ColorPicker, rgb2hsv, rgb2hex, CommandBarButton, IContextualMenuProps, Dropdown, IDropdownOption, IDropdownStyles, DropdownMenuItemType, IImageProps, ImageFit, Facepile, IFacepileProps, PersonaInitialsColor, IFacepilePersona, ISelectableOption, IRenderFunction, ISelectableDroppableTextProps, mergeStyleSets, PersonaSize, IStackTokens } from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';
import React from 'react';
import { ITaskInfo, Status } from '../../Interfaces/task/ITaskInfo';
import './task.css';
import profile from "../../react.png";

interface propFromDispatch {
  addParentCall: (task: ITaskInfo) => void;
}
const mapStatusStateToProps = (status: Status) => ({
  status: status
});
const mapDateToProps = (date: string) => ({
  date: date
});
type Props = ReturnType<typeof mapDateToProps> & ReturnType<typeof mapStatusStateToProps> & propFromDispatch;
export const Addtask: React.FC<Props> = ({ date, status, addParentCall }) => {

  const stackStyles: IStackStyles = {
    root: {
      height: 220,
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
  ];
  const facepileProps: IFacepileProps = {
    personas: [
      {
        data: 'Shakthi',
        personaName: 'Shakthi Shythanya',
        imageUrl: profile

      }
    ]
  };

  const setInitialFacePileState = (): IFacepileProps => {
    var currentUser = "Shakthi";
    var facepersonas = facepileProps.personas.filter(x => x.data === currentUser);
    var newFacepileTotal = { personas: facepersonas };
    return newFacepileTotal;
  }

  //let selectedDate :Date = new Date(Date.now());
  const calendarIcon: IIconProps = { iconName: 'Calendar', styles: iconStyles };
  let [selectedDate, setSelectedDate] = React.useState<Date>(new Date(Date.now()));
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
  const [nonCalendarDateSelected, setnonCalendarDateSelected] = React.useState<Boolean>(false);
  let calendarDate: Date = new Date();
  let setCalendarDefaultDate = () => {
    if (date === "today") {
      calendarDate = new Date(Date.now());
    }
    else if (date === "progress") {
      calendarDate = new Date(Date.now());
    }
    else if (date === "tomorrow") {
      calendarDate = (new Date(new Date(Date.now()).setDate(new Date(Date.now()).getDate() + 1)));
      console.log(calendarDate);
    }
    else if (date === "thisWeek") {
      calendarDate = (new Date(new Date(Date.now()).next().sunday().setHours(0, 0, 0, 0) - 1));
    }
    else if (date === "nextWeek") {
      calendarDate = (new Date(new Date(Date.now()).next().sunday().setHours(0, 0, 0, 0)).addDays(1));
    }
    else if (date === "future") {
      calendarDate = (new Date(new Date(Date.now()).next().sunday().setHours(0, 0, 0, 0)).addDays(8));
    }
    else if (date === "noDate") {
      calendarDate = (new Date(2000, 1, 1));
    }
    else if (date === "late") {
      calendarDate = (new Date(new Date(Date.now()).setDate(new Date(Date.now()).getDate() - 1)));
    }
  }

  if (date != '') {
    setCalendarDefaultDate();
  }
  const handleChange = (e: React.FormEvent<HTMLDivElement>, dOption: IDropdownOption) => {
    setisSelValue(true);
    setSelectedValue(options.find((s) => s.key == dOption.key)?.text.toString());
    setToggle(!toggleIsCalloutVisible);
    var facepersonas = facepileProps.personas.filter(x => x.data === dOption.key);
    var newFacepileTotal = { personas: facepersonas };
    setSelectedFacePile(newFacepileTotal);
  }

  const onSelectDate = React.useCallback(
    (selDate: Date): Date => {
      setnonCalendarDateSelected(true);

      setSelectedDate(selDate);
      console.log(selectedDate);
      hideCalendar();
      return selDate;
    },
    [hideCalendar],
  );
  var task: ITaskInfo;
  const Results = () => (
    <span className="requiredfield">
      Your task needs a name
    </span>
  )
  const [showValidation, setshowValidation] = React.useState(false)
  const addTask = () => {
    if (taskName.length == 0) {
      setshowValidation(true)
    }
    else {
      console.log(date);
      if (date !== "progress" && date !== "noDate") {
        setSelectedDate(calendarDate);
        console.log(selectedDate);
        console.log(calendarDate);
      }
      else if (date === "noDate") {
        setSelectedDate(new Date(2000, 1, 1));
      }
      let dateToBeAdded: Date = (date !== "progress" && date !== "noDate" && !nonCalendarDateSelected) ? calendarDate : date === "noDate" || (date === "progress" && !nonCalendarDateSelected) ? new Date(2000, 1, 1) : selectedDate;
      console.log(date);
      task =
      {
        id: 5,
        taskName: taskName,
        start: dateToBeAdded,
        end: dateToBeAdded,
        status: status,
        assigned: "Shakthi",
        desc: "To do"
      }
      addParentCall(task);
    }
  }

  return (<>
    <Stack styles={stackStyles} style={{ backgroundColor: 'white', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', margin: '2px 2px 2px 2px' }}>
      <Stack horizontal disableShrink tokens={horizontalGapStackTokens}>
        <Icon iconName="LocationCircle" className="icon" />
        <span className="textControl">
          <TextField
            required
            id="taskName"
            name="taskName"
            onChange={evt => setTaskNameValue(evt.currentTarget.value)}
            placeholder="Enter a task name"
            onKeyDown={(event) => { { setshowValidation(false) } }}
            borderless
            style={{ backgroundColor: '#EFEEEE', borderBottom: '2px solid', borderColor: 'green' }}
          />
          {showValidation ? <Results /> : null}
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
            disabled={date === "noDate" ? true : false}
            iconProps={calendarIcon}
            onClick={toggleShowCalendar}
            name="dueDate"
            id="dueDate"
            text={date === "progress" && !nonCalendarDateSelected ? 'Set due date' : date !== "progress" && date !== "noDate" && !nonCalendarDateSelected ? calendarDate.toLocaleDateString() : date === "noDate" ? "No Date" : selectedDate.toLocaleDateString()}>
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
                value={calendarDate}
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



