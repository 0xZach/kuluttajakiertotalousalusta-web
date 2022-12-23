import React, {FC} from 'react';
import {TranslationKeys} from 'src/hooks/useAppTranslation';
import {uuid} from 'uuidv4';
import {LocalizedLabel} from '../LocalizedLabel';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string | TranslationKeys;
}

export const LocalizedCheckbox: FC<LocalizedProps & IProps> = React.forwardRef<
    HTMLInputElement,
    LocalizedProps & IProps
>(({label, components, ...props}, ref): JSX.Element => {
    const id = uuid();

    return (
        <div className="localized-checkbox">
            <input ref={ref} id={id} type="checkbox" {...props} />
            {/* @ts-expect-error */}
            <LocalizedLabel htmlFor={id} t={label} components={components} />
        </div>
    );
});
