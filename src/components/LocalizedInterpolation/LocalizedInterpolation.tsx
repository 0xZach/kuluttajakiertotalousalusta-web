import React from 'react';
import Trans from 'next-translate/Trans';

const LocalizedInterpolation: React.FC<LocalizedProps> = ({t, ...props}) => (
    <Trans i18nKey={`common:${t}`} fallback={t} {...props} />
);

export {LocalizedInterpolation};
