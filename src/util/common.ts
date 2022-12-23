/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {Locale} from 'date-fns';
import en from 'date-fns/locale/en-GB';
import {fi} from 'date-fns/locale';
import getConfig from 'next/config';
import {NextApiRequest} from 'next';
import {IncomingMessage} from 'http';
import {getCustomCookie} from './cookie';
import {DEFAULT_LANGUAGE} from './constants';
import {GetServerSidePropsContext} from 'next';
import {ParsedUrlQuery} from 'querystring';

export const getLocalizedUrl = (url: string, ctx?: GetServerSidePropsContext<ParsedUrlQuery>) => {
    const locale = getCustomCookie('NEXT_LOCALE', ctx) || DEFAULT_LANGUAGE;
    return `${locale}${url}`;
};

export const redirectToErrorPage = () => {
    return {
        destination: '/error',
        permanent: false,
    };
};

export const outputToConsole = (message: unknown, defaultValue?: string) => {
    if (process.env.APP_ENV === 'local') {
        console.log(
            '\x1b[33m%s\x1b[0m', //custom colored logs
            defaultValue?.toUpperCase() || 'PRINT',
            `:::${JSON.stringify(message)}`,
        );
    }
};

export const runTimeServerConfig = () => {
    return process.env;
};

export const runTimeSharedConfig = () => {
    const config = getConfig();
    if (typeof window !== 'undefined') {
        const configValues = Object.values(config.publicRuntimeConfig.env) as {APP_URL: string}[];
        const env = configValues.find((conf) =>
            conf.APP_URL.toLowerCase().includes(window.location.host.toLowerCase()),
        );
        return env;
    }

    return config.publicRuntimeConfig.env[runTimeServerConfig().APP_ENV!] || {};
};

export const getLangFromUrl = (url: string) => {
    return url.split('/')[3];
};

export const getLanguage = (lang: string) => {
    const languages: Record<string, Locale> = {
        'en-GB': en,
        'fi-FI': fi,
    };
    return languages[lang];
};

export const getServerSideRequest = async <T = AnyObject>(args: ServerSideApiRequest<T>) => {
    const {context, path, method, data, params, headers} = args;
    const request: ApiRequest<T> = {
        path: `${path}`,
        method,
        isServer: true,
        locale: context.locale,
        headers,
    };
    if (params) request.params = params;
    if (data) request.data = data;
    return request;
};

export const urlConverter = (type: 'email' | 'phoneNumber', url: string) => {
    switch (type) {
        case 'email':
            return `mailto:${url}`;
        case 'phoneNumber':
            return `tel:${url}`;
        default:
            return `${url}`;
    }
};

export const getGoogleMapKey = (): string => {
    return runTimeSharedConfig().GOOGLE_MAP_KEY;
};
export const socialAccounts: SocialAccount[] = ['google', 'facebook'];

export const getUserName = (firstName: string, lastName: string | null) => {
    if (lastName) return `${firstName} ${lastName}`;
    return firstName;
};

export const getFormattedCurrency = (cost: number, locale = 'fi-FI', currency = 'EUR') => {
    return new Intl.NumberFormat(locale, {style: 'currency', currency}).format(cost);
};

export const getFormattedUnit = (value: number, locale = 'fi-FI', unit = 'kilometer') => {
    return new Intl.NumberFormat(locale, {style: 'unit', unit}).format(value);
};

export const trimLeadingTrailingCommas = (str: string) => str.replace(/(^,)|(,$)/g, '');

export const trimSpaces = (str: string) => str.replace(/\s+/g, '');

export const trimCommaAndSpace = (str: string) => {
    let trimmed = trimSpaces(str);
    trimmed = trimLeadingTrailingCommas(trimmed);
    return trimmed;
};

export const strToArr = (str: string) => trimCommaAndSpace(str).split(',');

export const trimFinnishCode = (phone: string) => phone.replace('+358 ', '0');

export const getIpFromNextRequest = (req: NextApiRequest | IncomingMessage): string | undefined => {
    const forwarded = req.headers['x-forwarded-for'] as string;
    return forwarded ? forwarded.split(/, /)[0] : req.socket.remoteAddress?.split?.(':').pop();
};

export const latLng2TileUrl = (
    lat: number,
    lon: number,
    zoom = 16,
    baseUrl = runTimeSharedConfig().OSM_TILES_BASE_URL,
) => {
    const tileX = Math.floor(((lon + 180) / 360) * Math.pow(2, zoom));
    const tileY = Math.floor(
        ((1 - Math.log(Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)) / Math.PI) / 2) *
            Math.pow(2, zoom),
    );

    // To get marker location on tile:
    // decimalX part of tileX * 256 px = marker location on tile from top left in x direction
    // decimalY part of tileY * 256 px = marker location on tile from top left in y direction

    return `${baseUrl}/tile/${zoom}/${tileX}/${tileY}.png`;
};

export const getDomainFromURL = (url: string) => {
    try {
        const link = new URL(url);
        const splittedLink = link.hostname.split('.');
        return splittedLink.splice(-3).join('.');
    } catch {
        return '';
    }
};
