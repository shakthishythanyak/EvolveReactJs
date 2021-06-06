import React from "react";
import ReactDOM from "react-dom";
import { Icon, Dropdown, IDropdownOption, IDropdownProps, initializeIcons } from '@fluentui/react';
initializeIcons();
const options: IDropdownOption[] = [
    { key: 'n', text: 'Not Started', data: { icon: 'LocationCircle', className: 'iconOpen' } },
    { key: 'i', text: 'In Progress', data: { icon: 'CircleHalfFull', className: 'iconInProgress' } },
    { key: 'c', text: 'Completed', data: { icon: 'CompletedSolid', className: 'iconCompleted' } },
];
const dropdownStyles = { dropdown: { width: 130 } }
export function OverlayFunction() {
    var placement: string = "bottom";
    const iconStyles = { marginRight: '8px' };
    const onRenderPlaceholder = (props: IDropdownProps): JSX.Element => {
        return (
            <div className="dropdownExample-placeholder">
                <Icon style={iconStyles} iconName={'MessageFill'} aria-hidden="true" />
                <span>{props.placeholder}</span>
            </div>
        );
    };
    const onRenderOption = (option: IDropdownOption): JSX.Element => {
        return (
            <div>
                {option.data && option.data.icon && (
                    <Icon style={iconStyles} iconName={option.data.icon} aria-hidden="true" title={option.data.icon} />
                )}
                <span>{option.text}</span>
            </div>
        );
    };

    const onRenderTitle = (options: IDropdownOption[]): JSX.Element => {
        const option = options[0];

        return (
            <div>
                {option.data && option.data.icon && (
                    <Icon style={iconStyles} iconName={option.data.icon} aria-hidden="true" title={option.data.icon} />
                )}

            </div>
        );
    };
    var selectedKey: string = "i"
    const onRenderCaretDown = (): JSX.Element => {
        return <Icon iconName="CirclePlus" />;
    };
    return (
        <>
            <Dropdown
                defaultSelectedKey={selectedKey}
                ariaLabel="Custom dropdown example"
                onChange={(e, selectedOption) => {
                    selectedKey = selectedOption?.text as string;
                    console.log(selectedKey);
                }}
                styles={dropdownStyles}
                options={options}
            />

        </>
    )
}
