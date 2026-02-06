import * as React from 'react';
import { FluentProvider, webLightTheme, Input, Dropdown, Option, Label, makeStyles, useId, Button } from '@fluentui/react-components';
import type { DropdownProps, SelectionEvents, OptionOnSelectData } from "@fluentui/react-components";

export interface ILengthConverterProps {
    value: number | null;
    onChange: (newValue: number | null) => void;
    baseUnit: string;
}

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'row',
        gap: '8px',
        alignItems: 'center',
        width: '100%',
    },
    input: {
        minWidth: '100px',
        flexGrow: 1,
    },
    dropdown: {
        minWidth: '120px',
    },
});

const units: Record<string, number> = {
    'm': 1,
    'cm': 0.01,
    'mm': 0.001,
    'km': 1000,
    'ft': 0.3048,
    'in': 0.0254,
    'yd': 0.9144,
    'mi': 1609.344
};

export const LengthConverterComponent: React.FunctionComponent<ILengthConverterProps> = (props) => {
    const styles = useStyles();
    const [displayUnit, setDisplayUnit] = React.useState<string>(props.baseUnit);
    const [displayValue, setDisplayValue] = React.useState<string>('');

    // Update local state when props change (e.g. data from Dataverse updates)
    React.useEffect(() => {
        if (props.value === null || props.value === undefined) {
            setDisplayValue('');
        } else {
            // Convert base value to display unit
            const valueInBase = props.value;
            const factor = units[displayUnit] / units[props.baseUnit];
            // Logic: Base / UnitFactor = ValueInMeters. 
            // Wait, let's normalize to meters first.
            // factorToBase = units[props.baseUnit] (meters per base unit)
            // factorToDisplay = units[displayUnit] (meters per display unit)

            const valueInMeters = valueInBase * units[props.baseUnit];
            const valueInDisplay = valueInMeters / units[displayUnit];

            // Avoid infinite loop / rounding issues if possible, but for display string we assume standard float behavior
            // Check if focus is distinct? Usually for controlled inputs we sync.
            // For now, simpler: just update display on prop change.
            setDisplayValue(valueInDisplay.toString());
        }
    }, [props.value, props.baseUnit, displayUnit]);

    const handleUnitChange = (event: SelectionEvents, data: OptionOnSelectData) => {
        if (data.optionValue) {
            setDisplayUnit(data.optionValue);
        }
    };

    const handleInputChange = (ev: React.ChangeEvent<HTMLInputElement>, data: { value: string }) => {
        const newValueStr = data.value;
        setDisplayValue(newValueStr);

        // Convert back to base unit for Dataverse
        if (newValueStr === '' || isNaN(Number(newValueStr))) {
            props.onChange(null);
            return;
        }

        const num = parseFloat(newValueStr);
        // Convert num (in displayUnit) -> meters -> baseUnit
        const valueInMeters = num * units[displayUnit];
        const valueInBase = valueInMeters / units[props.baseUnit];

        props.onChange(valueInBase);
    };

    return (
        <FluentProvider theme={webLightTheme}>
            <div className={styles.root}>
                <Input
                    type="number"
                    value={displayValue}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="Enter length..."
                />
                <Dropdown
                    className={styles.dropdown}
                    value={displayUnit}
                    onOptionSelect={handleUnitChange}
                    selectedOptions={[displayUnit]}
                >
                    {Object.keys(units).map((unit) => (
                        <Option key={unit} value={unit}>
                            {unit}
                        </Option>
                    ))}
                </Dropdown>
            </div>
        </FluentProvider>
    );
};
