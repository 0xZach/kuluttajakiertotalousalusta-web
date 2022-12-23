import React from 'react';
import {useAppTranslation} from 'src/hooks/useAppTranslation';

interface IProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    t?: string;
}

export const LocalizedExternalLink: React.FC<IProps> = ({href, children, t, ...props}) => {
    const {t: translate} = useAppTranslation();
    return (
        <a href={href || '#!'} target="_blank" rel="noreferrer" {...props}>
            {t && translate(t)}
            {children}
        </a>
    );
};
