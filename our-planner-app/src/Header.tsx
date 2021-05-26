import React from 'react';
import styled from 'styled-components';
import { FontIcon, mergeStyles,IStyleSet, Text, Label, ILabelStyles, Pivot, PivotItem, initializeIcons ,IPersonaSharedProps, Persona, PersonaSize , CommandButton,  IContextualMenuProps} from '@fluentui/react';
import profile from "./Profile.jpg";
import Calendar from "./Calendar";
import Board from "./Board";

//const { Label, Pivot, PivotItem, ThemeProvider, initializeIcons } = window.FluentUIReact;
const NavContainer = styled.div`
  width: 100%;
  height: 50px;
  position: fixed;
  background: #000000;
  margin: auto;
`;

const NavHeader = styled.div`
  width: 20%;
  float: left;
  padding: 10px;
`;

const CartSpan = styled.div`
    width: 30%;
    float: right;
    padding: 60px;
    cursor: pointer;
`;

const CartSpantest = styled.div`
    width: 20%;
    float: left;
    padding: 60px;
    cursor: pointer;
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

  //const ButtonCommandExample: React.FunctionComponent<IButtonExampleProps> = props => {
   // const { disabled, checked } = props;

// Initialize icons in case this example uses them
initializeIcons();

export const Header: React.FunctionComponent = () => {
  
  const filterProps: IContextualMenuProps = {
    items: [
      {
        key: 'filterDue',
        text: 'Due',
        //itemType: ContextualMenuItemType.Header},
         subMenuProps: {
          items: [
            { key: 'late', text: 'Late' },
            { key: 'today', text: 'Today' },
            { key: 'tomoarrow', text: 'Tomorrow'},
            { key: 'thisWeek', text: 'This week' },
            { key: 'nextWeek', text: 'Next Week' },
            { key: 'future', text: 'Future'},
            { key: 'noDate', text: 'No Date'},
         ],
        }
      },
      {
        key: 'filterProgress',
        text: 'Progress',
        subMenuProps: {
          items: [
            { key: 'noStarted', text: 'Not Started', iconProps: { iconName: 'StatusCircleRing' } },
            { key: 'inProgress', text: 'In progress' , iconProps: { iconName: 'CircleHalfFull' }},
            { key: 'completed', text: 'Completed', iconProps: { iconName: 'CompletedSolid', style: { color: 'green' }}}
          ],
        },
      },
    ],
    // By default, the menu will be focused when it opens. Uncomment the next line to prevent this.
    // shouldFocusOnMount: false
  };

  const groupProps: IContextualMenuProps = React.useMemo(
    () => ({
    items: [
      {
        key: keys[0],
        text: 'Due Date',
        iconProps: { iconName: 'Accept'}
        },
      {
        key: 'keys[1]',
        text: 'Progress',
        
      },
    ],
  } ),
  [Selection],
  );

  return (
    <div>
     <NavContainer>
          <NavHeader>
              //Do nothing
          </NavHeader>
      </NavContainer>
      <NavContainer>
          <CartSpantest>
              <table>
                <tr>
                  <td>
                  <Pivot aria-label="Links of Tab Style Pivot Example" linkFormat="tabs" style= {{color :"black"}}>
                  <PivotItem headerText="MT"></PivotItem>
                  </Pivot>
                  </td><td width="20"></td>
                  <td><Text block variant ='xLarge'>My Tasks</Text>
                  <Text variant ='tiny'>My Tasks</Text>
                  </td>
                  <td>
                  <FontIcon aria-label="Icon" iconName="FavoriteStar" className={iconClass} />
                  </td>
                </tr>
              </table>
          </CartSpantest>
          <CartSpantest>
          <Pivot aria-label="Board and Schedule">
                    <PivotItem
                      headerText="Board"
                      headerButtonProps={{
                        'data-order': 1,
                        'data-title': 'Board',
                      }}
                      >
                    <TabClass><Board></Board></TabClass>
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
          </CartSpantest>
        <CartSpan>
              <table>
                <tr>
                  <td>
                  <Persona {...examplePersona} text="Reshma Vishwanath" size={PersonaSize.size32} /></td>
                  <td>
                  <CommandButton text="Filter(0)" menuProps={filterProps} />
                  </td>
                  <td>
                  <CommandButton text="Groub by" menuProps={groupProps} />
                  </td>
                </tr>
              </table>
      </CartSpan>
   </NavContainer>
      </div>
  );
}

export default Header;