import React from 'react';
import {LocalizedText} from '../LocalizedText';

interface Props extends LocalizedProps {
    className?: string;
}

export const LocalizedContent: React.FC<Props> = ({className, ...props}) => {
    return (
        <p className={className}>
            <LocalizedText {...props} />
        </p>
    );
};
