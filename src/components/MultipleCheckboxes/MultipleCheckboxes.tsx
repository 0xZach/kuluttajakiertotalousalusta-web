import React from 'react';
import {Controller} from 'react-hook-form';
import {FormFieldContainer} from '../FormFieldContainer/FormFieldContainer';
import {LocalizedCheckbox} from '../LocalizedCheckbox/LocalizedCheckbox';

interface IMultipleCheckboxesProps extends Omit<FormField, 'fieldType'> {
    name: string;
    options: Option[];
    onChange: (val: string[]) => void;
    values: string[];
}

export const MultipleCheckboxes: React.FC<IMultipleCheckboxesProps> = ({
    options,
    label,
    name,
    values = [],
    onChange,
    ...props
}) => {
    const handleChange = (value: string) => {
        if (values.includes(value)) {
            const removedId = values.filter((val) => val !== value);
            onChange(removedId);
            return;
        }
        onChange([...values, value]);
    };

    return (
        <FormFieldContainer {...props} fieldType="checkboxes" label={label}>
            <div className="multiple-checkboxes">
                {options.map((option, index) => (
                    <LocalizedCheckbox
                        checked={values.includes(option.value as string)}
                        key={index}
                        name={name}
                        onChange={() => handleChange(option.value as string)}
                        label={option.label}
                    />
                ))}
            </div>
        </FormFieldContainer>
    );
};

export const ControlledMultipleCheckboxes: React.FC<Omit<IMultipleCheckboxesProps, 'onChange' | 'values'>> = ({
    isRequired,
    name,
    options,
    ...props
}) => {
    return (
        <Controller
            name={name}
            rules={{required: isRequired}}
            render={({field: {onChange, value}}) => (
                <MultipleCheckboxes {...props} options={options} onChange={onChange} name={name} values={value} />
            )}
        />
    );
};
