import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FontIcon, mergeStyles, IStyleSet, Text, Label, ILabelStyles, Pivot, PivotItem, initializeIcons, IPersonaSharedProps, Persona, PersonaSize, CommandButton, IContextualMenuProps, IIconProps, Callout, FocusTrapZone, TextField, Dropdown, IDropdownOption, DropdownMenuItemType, Stack, IStackTokens, Icon, IIconStyles, IStyle } from '@fluentui/react';
import profile from "./Profile.jpg";
import Calendar from "./Calendar";
import Board from "./Board";
import { ContextualMenuItemType, DirectionalHint, IContextualMenuItem } from '@fluentui/react/lib/ContextualMenu';
import { CommandBarButton, DefaultButton } from '@fluentui/react/lib/Button';
import { useBoolean, useConst } from '@fluentui/react-hooks';
import './header.css';

const NavContainer = styled.div`
  width: 100%;
  height: 30px;
  background: #000000;
  margin: auto;
`;
const HeaderContainer = styled.div`
  width: 100%;
  height: 20px;
  background: #000000;
  margin: Left;
`;
const NavHeader = styled.div`
  float: left;
  padding: 30px;
`;

const HeaderRightSpan = styled.div`
    float: right;
    padding :30px;
    cursor: pointer;
`;

const HeaderSpan = styled.div`
    width: 20%;
    padding: 30px;
    cursor: pointer;
    float: left;
`;

const TabClass = styled.div`
width: 80%;
padding: 30px;
position: absolute;
left: 3%;
`;

const iconClass = mergeStyles({
  height: 40,
});
var view = "";

const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
  root: { marginTop: 10 },
};

const examplePersona: IPersonaSharedProps = {
  imageUrl: profile,
};

export interface IButtonExampleProps {
  // These are set based on the toggles shown above the examples (not needed in real code)
  disabled?: boolean;
  checked?: boolean;
}

const keys: string[] = [
  'duedate',
  'progress',
];
var selectedFilters: string[] = [];
var filteredDescription: string;
//const ButtonCommandExample: React.FunctionComponent<IButtonExampleProps> = props => {
// const { disabled, checked } = props;

// Initialize icons in case this example uses them
initializeIcons();
let previousLength = -2;
let textOfFilter: string = "Filter(0)";
let textOfGroupBy: string = "Group By Progress";
let textOfDueDate: string = "Due(0)";
let textOfProgress: string = "Progress(0)";
let dueDateArray: string[] = ["late", "noDate", "today", "tomorrow", "thisWeek", "nextWeek", "future"];
let progressArray: string[] = ["notStarted", "inProgress", "completed"];
var selectedDueDateFilters: string[] = [];
var selectedProgessFilters: string[] = [];
export function Header() {

  const stackTokens: IStackTokens = { childrenGap: 20 };
  const filterApplied = (ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>, item?: IContextualMenuItem) => {
    let selectedVal: string = item !== undefined ? item.key : "";
    if (!selectedFilters.includes(selectedVal)) {

      selectedFilters.push(selectedVal);
      textOfFilter = "Filter(" + selectedFilters.length + ")";
      console.log("DueDateclicked" + view);
      setFilterCount(prevCount => prevCount + 1)
      previousLength = previousLength + 1;
    }
  }

  const optionSelected = (selectedVal: string) => {
    if (!selectedFilters.includes(selectedVal)) {

      selectedFilters.push(selectedVal);
      textOfFilter = "Filter(" + selectedFilters.length + ")";
      if (dueDateArray.includes(selectedVal)) {
        selectedDueDateFilters.push(selectedVal);
        textOfDueDate = "Due(" + selectedDueDateFilters.length + ")";
      }
      else {
        selectedProgessFilters.push(selectedVal);
        textOfProgress = "Progress(" + selectedProgessFilters.length + ")";
      }
      console.log("DueDateclicked" + view);
      setFilterCount(prevCount => prevCount + 1)
      previousLength = previousLength + 1;
    }
    else {
      selectedFilters = selectedFilters.filter(x => x !== selectedVal);
      textOfFilter = "Filter(" + selectedFilters.length + ")";
      if (dueDateArray.includes(selectedVal)) {
        selectedDueDateFilters = selectedDueDateFilters.filter(x => x !== selectedVal);
        textOfDueDate = "Due(" + selectedDueDateFilters.length + ")";
      }
      else {
        selectedProgessFilters = selectedProgessFilters.filter(x => x !== selectedVal);
        textOfProgress = "Progress(" + selectedProgessFilters.length + ")";
      }
      console.log("DueDateclicked" + view);
      setFilterCount(prevCount => prevCount + 1)
      previousLength = previousLength + 1;
    }
  }
  const filterProps: IContextualMenuProps = {

    items: [
      {

        key: 'filterDue',
        text: 'Due',
        subMenuProps: {
          items: [
            { key: 'late', text: 'Late', onClick: filterApplied },
            { key: 'today', text: 'Today', onClick: filterApplied },
            { key: 'tomorrow', text: 'Tomorrow', onClick: filterApplied },
            { key: 'thisWeek', text: 'This week', onClick: filterApplied },
            { key: 'nextWeek', text: 'Next Week', onClick: filterApplied },
            { key: 'future', text: 'Future', onClick: filterApplied },
            { key: 'noDate', text: 'No Date', onClick: filterApplied },
          ],
        }
      },
      {
        key: 'filterProgress',
        text: 'Progress',
        subMenuProps: {
          items: [
            { key: 'notStarted', text: 'Not Started', onClick: filterApplied, iconProps: { iconName: 'StatusCircleRing' } },
            { key: 'inProgress', text: 'In progress', onClick: filterApplied, iconProps: { iconName: 'CircleHalfFull' } },
            { key: 'completed', text: 'Completed', onClick: filterApplied, iconProps: { iconName: 'CompletedSolid', style: { color: 'green' } } }
          ],
        },
      },
    ],
    // By default, the menu will be focused when it opens. Uncomment the next line to prevent this.
    // shouldFocusOnMount: false
  };

  //var Defaultview="DueDate";
  function handleGroupByDueDateClick() {
    view = "DueDate";
    textOfGroupBy = "Group By DueDate";
    console.log("DueDateclicked" + view);
    setCount(prevCount => prevCount + 1)
    //useForceUpdate()
  }
  function handleGroupByProgressClick() {
    view = "Progress";
    textOfGroupBy = "Group By Progress";
    console.log("ProgressClicked" + view);
    setCount(prevCount => prevCount + 1)
    //useForceUpdate();
  }
  //const [, updateState] = React.useState();
  //const forceUpdate = React.useCallback(() => updateState({}), []);

  const [count, setCount] = useState(0);
  const [filterCount, setFilterCount] = useState(0);
  const [showFilter, { toggle: toggleShowFilter, setFalse: hideFilter }] = useBoolean(false);
  const [showDueDateOptions, { toggle: toggleshowDueDateOptions, setFalse: hideDueDateOptions }] = useBoolean(false);
  const [showProgressOptions, { toggle: toggleshowProgressOptions, setFalse: hideProgressOptions }] = useBoolean(false);
  const [filterDescription, setfilterDescription] = React.useState<string>("");
  const buttonContainerRef = React.useRef<HTMLDivElement>(null);

  const menuProps = useConst<IContextualMenuProps>(() => ({
    shouldFocusOnMount: false,
    items: [
      { key: 'DueDate', text: 'Due Date', onClick: handleGroupByDueDateClick, },
      { key: 'Progress', text: 'Progress', onClick: handleGroupByProgressClick }
    ],
  }));
  return (
    <div>
      <NavContainer>
        <NavHeader>
        </NavHeader>
      </NavContainer>
      <NavContainer>
        <HeaderSpan>
          <table>
            <tr>
              <td>
                <Pivot aria-label="Links of Tab Style Pivot Example" linkFormat="tabs" style={{ color: "black" }}>
                  <PivotItem headerText="MT"></PivotItem>
                </Pivot>
              </td><td width="20"></td>
              <td><Text block variant='xLarge'>My Tasks</Text>
                <Text variant='tiny'>My Tasks</Text>
              </td>
              <td>
                <FontIcon aria-label="Icon" iconName="FavoriteStar" className={iconClass} />
              </td>
            </tr>
          </table>
        </HeaderSpan>
        <HeaderSpan>
          <Pivot aria-label="Board and Schedule">
            <PivotItem
              headerText="Board"
              headerButtonProps={{
                'data-order': 1,
                'data-title': 'Board',
              }}
            >

              {
                <TabClass>
                  {/* {selectedFilters && selectedFilters.length > previousLength && <Board SelectedView={view} SelectedFilter={selectedFilters} ></Board>} */}
                  <Board SelectedView={view} SelectedFilter={selectedFilters} AppliedFilter={filterDescription} ></Board>
                </TabClass>
              }
            </PivotItem>
            <PivotItem headerText="Schedule">
              <TabClass>
                <Calendar></Calendar>
              </TabClass>
            </PivotItem>
            <PivotItem headerText="...">
              <Label styles={labelStyles}>More to come......</Label>
            </PivotItem>
          </Pivot>
        </HeaderSpan>
        <HeaderRightSpan>
          <table>
            <tr>
              <td>
                <Persona {...examplePersona} text="Reshma Vishwanath" size={PersonaSize.size32} /></td>
              <td>
                <div ref={buttonContainerRef}>
                  <CommandButton text={textOfFilter} onClick={toggleShowFilter} />
                </div>
                {showFilter && (
                  <Callout
                    isBeakVisible={false}
                    gapSpace={0}
                    doNotLayer={false}
                    target={buttonContainerRef}
                    directionalHint={DirectionalHint.bottomCenter}
                    onDismiss={hideFilter}
                    setInitialFocus
                  >

                    <Stack tokens={stackTokens}>

                      <div style={{ padding: '10px' }}>
                        <div className="listButtonText">
                          <td style={{ width: '200px' }}> Filter</td>
                          <td><CommandBarButton style={{ textAlign: 'right' }} onClick={() => setfilterDescription("")} >Clear</CommandBarButton></td>
                        </div>
                        <TextField
                          placeholder="Filter By Keyword"
                          borderless
                          name={filterDescription}
                          value={filterDescription}
                          style={{ height: '40px', backgroundColor: '#EFEEEE', borderBottom: '2px solid', borderColor: 'green' }}
                          onChange={evt => setfilterDescription(evt.currentTarget.value)}
                        ></TextField>
                      </div>
                      <CommandBarButton className="menuButton" onClick={toggleshowDueDateOptions}>
                        <div>
                          <td style={{ width: '200px', paddingLeft: '15px', textAlign: 'left', fontSize: 'large' }}>{textOfDueDate}</td>
                          <td><Icon className="arrrow" iconName={showDueDateOptions ? "ChevronUp" : "ChevronDown"}></Icon></td>
                        </div>
                      </CommandBarButton>

                      {showDueDateOptions && <table>
                        <tr>
                          <CommandBarButton className="listButtonText" onClick={(e) => optionSelected("late")}>
                            <td style={{ width: '200px', paddingLeft: '15px', textAlign: 'left', fontSize: 'large' }}>Late</td>
                            <td>{selectedFilters.includes("late") && <Icon className="iconTick" iconName="CheckMark"></Icon>}</td>
                          </CommandBarButton>
                        </tr>
                        <tr>
                          <CommandBarButton className="listButtonText" onClick={(e) => optionSelected("today")}>
                            <td style={{ width: '200px', paddingLeft: '15px', textAlign: 'left', fontSize: 'large' }}>Today</td>
                            <td>{selectedFilters.includes("today") && <Icon className="iconTick" iconName="CheckMark"></Icon>}</td>
                          </CommandBarButton>
                        </tr>
                        <tr>
                          <CommandBarButton className="listButtonText" onClick={(e) => optionSelected("tomorrow")}>
                            <td style={{ width: '200px', paddingLeft: '15px', textAlign: 'left', fontSize: 'large' }}>Tomorrow</td>
                            <td>{selectedFilters.includes("tomorrow") && <Icon className="iconTick" iconName="CheckMark"></Icon>}</td>
                          </CommandBarButton>
                        </tr>
                        <tr>
                          <CommandBarButton className="listButtonText" onClick={(e) => optionSelected("thisWeek")}>
                            <td style={{ width: '200px', paddingLeft: '15px', textAlign: 'left', fontSize: 'large' }}>This Week</td>
                            <td>{selectedFilters.includes("thisWeek") && <Icon className="iconTick" iconName="CheckMark"></Icon>}</td>
                          </CommandBarButton>
                        </tr>
                        <tr>
                          <CommandBarButton className="listButtonText" onClick={(e) => optionSelected("nextWeek")}>
                            <td style={{ width: '200px', paddingLeft: '15px', textAlign: 'left', fontSize: 'large' }}>Next Week</td>
                            <td>{selectedFilters.includes("nextWeek") && <Icon className="iconTick" iconName="CheckMark"></Icon>}</td>
                          </CommandBarButton>
                        </tr>
                        <tr>
                          <CommandBarButton className="listButtonText" onClick={(e) => optionSelected("future")}>
                            <td style={{ width: '200px', paddingLeft: '15px', textAlign: 'left', fontSize: 'large' }}>Future</td>
                            <td>{selectedFilters.includes("future") && <Icon className="iconTick" iconName="CheckMark"></Icon>}</td>
                          </CommandBarButton>
                        </tr>
                        <tr>
                          <CommandBarButton className="listButtonText" onClick={(e) => optionSelected("noDate")}>
                            <td style={{ width: '200px', paddingLeft: '15px', textAlign: 'left', fontSize: 'large' }}>No Date</td>
                            <td>{selectedFilters.includes("noDate") && <Icon className="iconTick" iconName="CheckMark"></Icon>}</td>
                          </CommandBarButton>
                        </tr>
                      </table>
                      }

                      <CommandBarButton className="menuButton" onClick={toggleshowProgressOptions}><div>
                        <td style={{ width: '200px', paddingLeft: '15px', textAlign: 'left', fontSize: 'large' }}>{textOfProgress}</td>
                        <td><Icon className="arrrow" iconName={showProgressOptions ? "ChevronUp" : "ChevronDown"}></Icon></td>
                      </div>
                      </CommandBarButton>

                      {showProgressOptions && <table>
                        <tr>
                          <CommandBarButton iconProps={{ iconName: 'StatusCircleRing', style: { color: 'gray' } }} className="listButtonText" onClick={(e) => optionSelected("notStarted")}>
                            <td style={{ width: '200px', paddingLeft: '15px', textAlign: 'left', fontSize: 'large' }}>Not Started</td>
                            <td>{selectedFilters.includes("notStarted") && <Icon className="iconTick" iconName="CheckMark"></Icon>}</td>
                          </CommandBarButton>
                        </tr>
                        <tr>
                          <CommandBarButton iconProps={{ iconName: 'CircleHalfFull' }} className="listButtonText" onClick={(e) => optionSelected("inProgress")}>
                            <td style={{ width: '200px', paddingLeft: '15px', textAlign: 'left', fontSize: 'large' }}>In Progress</td>
                            <td>{selectedFilters.includes("inProgress") && <Icon className="iconTick" iconName="CheckMark"></Icon>}</td>
                          </CommandBarButton>
                        </tr>
                        <tr>
                          <CommandBarButton iconProps={{ iconName: 'CompletedSolid', style: { color: 'green' } }} className="listButtonText" onClick={(e) => optionSelected("completed")}>
                            <td style={{ width: '200px', paddingLeft: '15px', textAlign: 'left', fontSize: 'large' }}>Completed</td>
                            <td>{selectedFilters.includes("completed") && <Icon className="iconTick" iconName="CheckMark"></Icon>}</td>
                          </CommandBarButton>
                        </tr>
                      </table>
                      }
                    </Stack>

                  </Callout>
                )}

              </td>
              <td>
                <CommandButton text={textOfGroupBy} menuProps={menuProps} />
              </td>
            </tr>
          </table>
        </HeaderRightSpan>
      </NavContainer>
    </div >
  );
}

export default Header;