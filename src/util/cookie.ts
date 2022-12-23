import {GetServerSidePropsContext} from 'next';
import nookies, {setCookie, destroyCookie} from 'nookies';
import {ParsedUrlQuery} from 'querystring';

const COOKIE_AGE = {
    THIRTY_DAYS: 30 * 24 * 60 * 60,
};

export const setCustomCookie = (key: string, value: string, ctx?: GetServerSidePropsContext<ParsedUrlQuery>) => {
    setCookie(ctx, key, value, {
        maxAge: COOKIE_AGE.THIRTY_DAYS,
        path: '/',
    });
};

export const removeCustomCookie = (key: string, ctx?: GetServerSidePropsContext<ParsedUrlQuery>) => {
    destroyCookie(ctx, key, {
        path: '/',
    });
};

export const getCustomCookie = (key: string, ctx?: GetServerSidePropsContext<ParsedUrlQuery>) => {
    return nookies.get(ctx)[key] ?? null;
};
