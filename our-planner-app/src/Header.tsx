import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FontIcon, mergeStyles, IStyleSet, Text, Label, ILabelStyles, Pivot, PivotItem, initializeIcons, IPersonaSharedProps, Persona, PersonaSize, CommandButton, IContextualMenuProps, IIconProps } from '@fluentui/react';
import profile from "./Profile.jpg";
import Calendar from "./Calendar";
import Board from "./Board";
import { ContextualMenuItemType, IContextualMenuItem } from '@fluentui/react/lib/ContextualMenu';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { useConst } from '@fluentui/react-hooks';

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
//const ButtonCommandExample: React.FunctionComponent<IButtonExampleProps> = props => {
// const { disabled, checked } = props;

// Initialize icons in case this example uses them
initializeIcons();
let previousLength = -2;
let textOfFilter: string = "Filter(0)";
let textOfGroupBy: string = "Group By Progress";
export function Header() {


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
                  <Board SelectedView={view} SelectedFilter={selectedFilters} ></Board>
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
                <CommandButton text={textOfFilter} menuProps={filterProps} />
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