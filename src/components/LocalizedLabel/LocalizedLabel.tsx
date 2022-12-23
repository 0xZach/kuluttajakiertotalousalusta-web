import React from 'react';
import {LocalizedText} from '../LocalizedText';

interface Props extends LocalizedProps {
    htmlFor?: string;
}

export const LocalizedLabel: React.FC<Props> = ({htmlFor, ...props}) => {
    return (
        <label htmlFor={htmlFor}>
            <LocalizedText {...props} />
        </label>
    );
};
