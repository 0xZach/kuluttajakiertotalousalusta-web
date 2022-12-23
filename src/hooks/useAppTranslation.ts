import {Paths} from './../types/utils';
import useTranslation from 'next-translate/useTranslation';
import translations from '../../public/locales/en/common.json';
import {TranslationQuery} from 'next-translate';

export type TranslationKeys = Paths<typeof translations>;

export const useAppTranslation = () => {
    const {t, lang} = useTranslation('common');
    // ToDo: Add logic for dynamic content in components after that remove `string`
    // from `i18nKey`
    return {
        t: <T = string>(
            i18nKey: TranslationKeys | TemplateStringsArray | string,
            query?: TranslationQuery | null,
            options?: {
                returnObjects?: boolean;
                fallback?: string | string[];
                default?: string;
            },
        ) => t<T>(i18nKey, query, options),
        lang,
    };
};
