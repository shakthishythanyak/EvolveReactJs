import { Stack, TextField, ActionButton, PrimaryButton, IStackStyles, DefaultPalette, IIconProps, DefaultSpacing, Icon, DefaultButton, Callout, DirectionalHint, FocusTrapZone, Calendar, IIconStyles, DefaultFontStyles, DefaultEffects, ColorPicker, rgb2hsv, rgb2hex, CommandBarButton, IContextualMenuProps, Dropdown, IDropdownOption, IDropdownStyles, DropdownMenuItemType, IImageProps, ImageFit, Facepile, IFacepileProps, PersonaInitialsColor, IFacepilePersona, ISelectableOption, IRenderFunction, ISelectableDroppableTextProps, mergeStyleSets, PersonaSize } from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';
import React from 'react';
import { ITaskInfo, Status, User } from '../../Interfaces/task/ITaskInfo';
import './task.css'

export function Addtask(statusOfTask: ITaskInfo)
{
    const stackStyles: IStackStyles = {
        root: {
            height:240,
            background: DefaultPalette.themeTertiary,
          overflow: 'hidden',
          width: 300,

        },
      };

      const iconStyles: IIconStyles = {
        root: {
          color: rgb2hex(0,128,128),
          padding:'0px -16px !important'
        },
      };
      const dropdownStyles: Partial<IDropdownStyles> = {
        dropdown: { width: 300 },
      };
      
      const options: IDropdownOption[] = [
        { key: 'Shakthi', text: 'Shakthi Shythanya' },
        { key: 'Reshma', text: 'Reshma V' },
        { key: 'Braja', text: 'Braja' }
      ];

      // const onRenderOption = (option: IDropdownOption): JSX.Element => {
      //   return (
      //     <div>
      //       {option.data && option.data.icon && (
      //         <img src={option.data.icon} style={{width:'50px', height:'50px'}} aria-hidden="true" title={option.data.icon} />
      //       )}
      //       <span>{option.text}</span>
      //     </div>
      //   );
      // };
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
      
const stylesFacePile = mergeStyleSets({
  container: {
    maxWidth: 300,
  },
  
  control: {
    paddingTop: 20,
  },
  slider: {
    margin: '10px 0',
  },
  checkbox: {
    paddingTop: 15,
  },
  dropdown: {
    paddingTop: 0,
    margin: '10px 0',
  }
});
      // const onRenderOption = (option: IDropdownOption):React.ReactElement<ISelectableOption> => {
      //   var facepersonas = facepileProps.personas.filter(x=>{x.data = option.data});
      //   var newFacepileTotal = { personas:facepersonas};
      //   return (
      //     <>
      //     <div>
      //       {option.data && option.data.icon && (
      //         <Facepile {...newFacepileTotal} />
      //       )}
      //       <span>{option.text}</span>
      //     </div>
      //     </>
      //   );
      // };
      // const onRenderOption = (option: IDropdownOption): ISelectableOption => {
      //   return (
      //     <div >
      //       {option.data && option.data.icon && (
      //         <Icon iconName={option.data.icon} aria-hidden="true" title={option.data.icon}/>
      //       )}
      //       <span>{option.text}</span>
      //     </div>
      //   );
      // };
      const setInitialFacePileState = ():IFacepileProps =>
      {
       var currentUser = "Shakthi";
        var facepersonas = facepileProps.personas.filter(x=>x.data === currentUser);
        var newFacepileTotal = { personas:facepersonas};
        return newFacepileTotal;
      }
      const initialTasks : ITaskInfo[] =[
        {
          taskName:"Add Informtaion",
          taskDesc:"To do",
          dueDate:new Date(Date.now()),
          status:Status.InProgress,
          assignee: {name:"user name test",profilePic:"assd"}
        },
        {
          taskName:"Update Detailed Informtaion",
          dueDate:new Date(Date.now()),
          taskDesc:"To do",
          status:Status.Completed,
          assignee: {name:"user name test",profilePic:"assd"}
        },
        {
          taskName:"Change",
          dueDate:new Date(Date.now()),
          taskDesc:"To do",
          status:Status.Open,
          assignee: {name:"user name test",profilePic:"assd"}
        }
      ]
      const intialTasks = () : ITaskInfo[] =>
      {          
        return initialTasks;
      }
      const calendarIcon: IIconProps = { iconName: 'Calendar', styles:iconStyles };
      const [selectedDate, setSelectedDate] = React.useState<Date>();
      const [toggle,setToggle]=React.useState<Boolean>();
      const [isCalloutVisible, { toggle: toggleIsCalloutVisible, setFalse:hideCallout }] = useBoolean(false);
      const [tasks,setTasks] = React.useState<ITaskInfo[]>(() => intialTasks());
      const [selectedValue,setSelectedValue]=React.useState<string>();
      const [selectedFacePile,setSelectedFacePile]=React.useState<IFacepileProps>(()=>setInitialFacePileState());
      const [isSelValue,setisSelValue]=React.useState<Boolean>();
      const [taskName, setTaskNameValue] = React.useState<string>();
      const handleChange = (e: React.FormEvent<HTMLDivElement>, dOption: IDropdownOption) =>
      {
        setisSelValue(true);
        setSelectedValue(options.find((s) => s.key == dOption.key)?.text.toString());
        console.log(options.find((s) => s.key == dOption.key)?.text.toString());
        console.log(selectedValue);
        setToggle(!toggleIsCalloutVisible);
        console.log(facepileProps);
        var facepersonas = facepileProps.personas.filter(x=>x.data === dOption.key);
        console.log(facepileProps.personas.filter(x=>x.data === dOption.key));
        console.log(dOption.key);
        console.log(facepersonas);
        var newFacepileTotal = { personas:facepersonas};
        setSelectedFacePile(newFacepileTotal);
        console.log(newFacepileTotal);
      }

        const [showCalendar, { toggle: toggleShowCalendar, setFalse: hideCalendar }] = useBoolean(false);
        const buttonContainerRef = React.useRef<HTMLDivElement>(null);
        const actionContainerRef = React.useRef<HTMLDivElement>(null);
      
        const onSelectDate = React.useCallback(
          (date: Date): Date => {
            console.log("Entered select");
            setSelectedDate(date);
            hideCalendar();
            return date;
          },
          [hideCalendar],
        );
       

        const onSetToggle = 
          (toggle: Boolean) => {
            console.log("Entered select toggle");
            setToggle(toggle);
          };

          const addTask = () =>
          {
            const assignee:User = JSON.parse(JSON.stringify({name:selectedValue}));
            const taskToBeAdded = JSON.stringify({taskName,dueDate:selectedDate,status:statusOfTask,assignee});
            initialTasks.push(JSON.parse(taskToBeAdded));
            //[]...intitalTasks] =  Object.assign({taskName,selectedDate,statusOfTask},...initialTasks);
            console.log(initialTasks);
          }
    return ( <>    
        <Stack>
                <Stack style={{backgroundColor:'white',boxShadow :'rgba(0, 0, 0, 0.35) 0px 5px 15px', margin:'2px 2px 2px 2px'}} styles={stackStyles}>
                <div className="wrapper">                    
                        
                   <Stack.Item className="icon" grow > <Icon iconName="LocationCircle" /></Stack.Item>
                   <Stack.Item grow disableShrink className="textControl"> 
                    <TextField 
                    id="taskName"
                    name="taskName"
                    onChange={evt=>setTaskNameValue(evt.currentTarget.value)}
                    placeholder="Enter a task name"
                    borderless
                    style={{backgroundColor:'#EFEEEE', borderBottom:'2px solid',  borderColor:'green'}}
                  />
                  </Stack.Item>
                </div>
                <div className="wrapper"> 
                        <Stack.Item className="icon" grow > <Icon iconName="Taskboard" /></Stack.Item>
                        <Stack.Item grow disableShrink className="textDescription"> 
                        To do
                       </Stack.Item>
                </div>
                 <div ref={buttonContainerRef}>
                  <Stack.Item className="icon" grow > <Icon iconName="Calendar" />
                        
                    <DefaultButton 
                        style={{  borderStyle:'none'}}
                        onClick={toggleShowCalendar} 
                        name="dueDate"
                        id="dueDate"
                        text={!selectedDate ? 'Set due date' : selectedDate.toLocaleDateString()}></DefaultButton>
                      
                       </Stack.Item>
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
                <div style={{paddingTop:'-10px'}}>
                <div ref={actionContainerRef}>
                {!isSelValue && <ActionButton  onClick={toggleIsCalloutVisible}>
                    <div className="icon"><Icon iconName="AddFriend"/></div>
                        <div className="assigneeControl"> 
                        &nbsp;&nbsp;&nbsp; Assign
                       </div> 
                       </ActionButton>
                }</div>
                    
                       {isSelValue && (<>
          <div className="textDescription">           
              <Facepile {...selectedFacePile} styles={{root:{color: rgb2hex(128,128,128),fontSize:'16px !important'}}} />
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
                    //onRenderOption={onRenderOption}
                    options={options}
                    onChange={(e, selectedOption) => {
                    selectedOption && handleChange(e, selectedOption);}}
                    styles={dropdownStyles}
                    
                    onDismiss={hideCallout}
                  />
                 </FocusTrapZone>
              </Callout>
            )}
                </div>
                <br>
                </br>
                <div className="buttonWrapper"> 
                        <PrimaryButton style={{backgroundColor:'green',height:'51px'}} onClick={addTask}> 
                            AddTask
                        </PrimaryButton>
                </div>

                
        </Stack>
        </Stack>
            </>
            );

    
}



