import classNames from 'classnames';
import React, {FC} from 'react';
import {LocalizedLabel} from '../LocalizedLabel';
import {LocalizedText} from '../LocalizedText';

export const FormFieldContainer: FC<FormField> = ({
    fieldType,
    label,
    size = 'medium',
    helpText,
    isRequired,
    error,
    children,
}) => {
    return (
        <div className={classNames('form-field-container', fieldType, size, {required: isRequired, error})}>
            {label && <LocalizedLabel t={label} />}
            {children}
            {/* @ts-expect-error */}
            {error && <LocalizedText t={helpText} />}
        </div>
    );
};
