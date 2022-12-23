import React from 'react';
import {LocalizedText} from '../LocalizedText';
interface Props extends LocalizedProps {
    heading?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    className?: string;
}

export const LocalizedHeading: React.FC<Props> = ({heading, className = '', ...props}) => {
    const text = <LocalizedText {...props} />;
    switch (heading) {
        case 'h1':
            return <h1 className={className}>{text}</h1>;

        case 'h2':
            return <h2 className={className}>{text}</h2>;

        case 'h3':
            return <h3 className={className}>{text}</h3>;

        case 'h4':
            return <h4 className={className}>{text}</h4>;

        case 'h5':
            return <h5 className={className}>{text}</h5>;

        case 'h6':
            return <h6 className={className}>{text}</h6>;

        default:
            return <h3 className={className}>{text}</h3>;
    }
};
