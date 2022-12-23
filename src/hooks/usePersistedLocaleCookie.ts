import {getCustomCookie, setCustomCookie} from './../util/cookie';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {DEFAULT_LANGUAGE} from 'src/util/constants';

export const usePersistLocaleCookie = () => {
    const {locale, defaultLocale} = useRouter();
    const persistLocaleCookie = () => {
        const parsedLocale = getCustomCookie('NEXT_LOCALE') || locale || DEFAULT_LANGUAGE;
        setCustomCookie('NEXT_LOCALE', parsedLocale);
    };
    useEffect(persistLocaleCookie, [locale, defaultLocale]);
};
