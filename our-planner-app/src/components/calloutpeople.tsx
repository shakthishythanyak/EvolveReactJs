import { Checkbox, IPersonaProps, IBasePickerSuggestionsProps, NormalPeoplePicker, ValidationState, ThemeProvider, initializeIcons, Callout, DirectionalHint, FocusTrapZone, Calendar, IIconStyles, DefaultFontStyles, DefaultEffects, ColorPicker, rgb2hsv, rgb2hex, CommandBarButton, IContextualMenuProps, DefaultButton, Dropdown, mergeStyleSets, FontWeights } from '@fluentui/react';
import { useBoolean, useId } from '@fluentui/react-hooks';
import React from 'react';
// Initialize icons in case this example uses them
initializeIcons();


export const CalloutBasicExample: React.FunctionComponent = () => {
  const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] = useBoolean(false);
  const buttonId = useId('callout-button');
  const labelId = useId('callout-label');
  const descriptionId = useId('callout-description');
 const [selectedValue,setSelectedValue]=React.useState<string>();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
  {
    e.preventDefault();
    setSelectedValue(e.target.value);
    console.log(selectedValue);
  }

  return (
    <>      
        <Callout
          className={styles.callout}
          ariaLabelledBy={labelId}
          ariaDescribedBy={descriptionId}
          role="alertdialog"
          gapSpace={0}
          directionalHint={DirectionalHint.bottomRightEdge}
          onDismiss={toggleIsCalloutVisible}
          setInitialFocus
        >
        <div className='ms-DropdownBasicExample'>
        <Dropdown
          label='Basic example:'
          options={
            [
              { key: 'A', text: 'Option a' },
              { key: 'B', text: 'Option b', isSelected: true },
              { key: 'C', text: 'Option c' },
              { key: 'D', text: 'Option d' },
              { key: 'E', text: 'Option e' },
              { key: 'F', text: 'Option f' },
              { key: 'G', text: 'Option g' },
            ]
          }
          onSelect={handleChange}
        />
        </div>
        </Callout>
      
    </>
  );
};

const styles = mergeStyleSets({
  button: {
    width: 130,
  },
  callout: {
    width: 320,
    padding: '20px 24px',
  },
  title: {
    marginBottom: 12,
    fontWeight: FontWeights.semilight,
  },
  link: {
    display: 'block',
    marginTop: 20,
  },
});
