import { Stack, TextField, ActionButton, PrimaryButton, IStackStyles, DefaultPalette, IIconProps, DefaultSpacing, Icon } from '@fluentui/react';
import './task.css'

export function Addtask()
{
    
    const stackStyles: IStackStyles = {
        root: {
            height:220,
            background: DefaultPalette.themeTertiary,
          overflow: 'hidden',
          width: 300,
        },
      };
      const assignIcon: IIconProps = { iconName: 'AddFriend' };
      
    return ( <>
    
        <Stack>
                <Stack style={{backgroundColor:'white',boxShadow :'rgba(0, 0, 0, 0.35) 0px 5px 15px', margin:'2px 2px 2px 2px'}} styles={stackStyles}>
                <div className="wrapper">                    
                        
                   <Stack.Item className="icon" grow > <Icon iconName="LocationCircle" /></Stack.Item>
                   <Stack.Item grow disableShrink className="textControl"> 
                    <TextField 
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
                <div className="wrapper">
                      <ActionButton allowDisabledFocus> 
                      <div className="icon">
                         <Icon iconName="Calendar" />
                         </div>
                       <div className="textDescription"> 
                         due date
                         </div>
                         </ActionButton>
                </div>
                <div className="wrapper">                    
                <ActionButton allowDisabledFocus>
                <div className="icon"><Icon iconName="AddFriend"/></div>
                        <div className="textDescription"> 
                         Assign
                       </div> 
                       </ActionButton>
                </div>
                <div className="buttonWrapper"> 
                        <PrimaryButton style={{backgroundColor:'green',height:'50px'}}>
                            AddTask
                        </PrimaryButton>
                </div>

                
        </Stack>
        </Stack>
            </>
            );
    
}