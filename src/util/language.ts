import setLanguage from 'next-translate/setLanguage';

export const changeLanguage = async (lang: Locales) => await setLanguage(lang);

export const langOptions = [
    {
        value: 'en-GB',
        label: 'LANGUAGES.EN-GB',
        key: 'en',
    },
    {
        value: 'fi-FI',
        label: 'LANGUAGES.FI-FI',
        key: 'fi',
    },
];

export const langKey: {[key: string]: string} = {
    'en-GB': 'LANGUAGES.EN-GB',
    'fi-FI': 'LANGUAGES.FI-FI',
};

export const countryCodes: {[key: string]: string} = {
    en: 'uk',
    fi: 'finland',
};
