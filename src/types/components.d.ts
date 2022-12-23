import {TranslationKeys} from './../hooks/useAppTranslation';
import {TransProps} from 'next-translate';

declare global {
    interface LocalizedProps extends Omit<TransProps, 'i18nKey'> {
        t?: TranslationKeys;
        title?: TranslationKeys;
        content?: string;
    }
    type OptionValue = string | number;
    type Option = {
        value: OptionValue;
        label: TranslationKeys | string;
        description?: string;
    };

    export type Image = {
        imageData: string;
        name: string;
    };

    export type ImageResolution = {
        minWidth: number;
        minHeight: number;
        aspect: number;
    };

    declare interface ITab {
        label: TranslationKeys;
        route: string;
    }

    type FieldType =
        | 'localized-input'
        | 'localized-textarea'
        | 'localized-select'
        | 'searchable-dropdown'
        | 'autocomplete-address'
        | 'file-uploader'
        | 'radio-buttons'
        | 'localized-calendar'
        | 'checkboxes'
        | 'phone-input';

    type FormField = {
        fieldType: FieldType;
        error?: boolean;
        helpText?: TranslationKeys | string;
        label?: TranslationKeys;
        isRequired?: boolean;
        size?: 'small' | 'medium' | 'large';
    };
}
