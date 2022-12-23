import React from 'react';
import {useAppTranslation} from 'src/hooks/useAppTranslation';
import {LocalizedInterpolation} from '../LocalizedInterpolation';

const LocalizedText: React.FC<LocalizedProps & {className?: string}> = ({
    t,
    className = '',
    title,
    content,
    ...props
}) => {
    const {t: trans} = useAppTranslation();
    return (
        <span className={className} title={title && trans(title)}>
            {t ? <LocalizedInterpolation t={t} {...props} /> : content}
        </span>
    );
};

export {LocalizedText};
