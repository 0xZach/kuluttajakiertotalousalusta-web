import React from 'react';
import Link, {LinkProps} from 'next/link';
import {LocalizedText} from '../LocalizedText';

interface Props extends LocalizedProps, Omit<LinkProps, 'href'> {}
export const LocalizedLink: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement> & LocalizedProps & Props> = ({
    href,
    t,
    values,
    components,
    children,
    ...props
}) => {
    return (
        <Link href={href || '#!'} {...props}>
            <a {...props}>
                {children}
                {<LocalizedText t={t} values={values} components={components} />}
            </a>
        </Link>
    );
};
