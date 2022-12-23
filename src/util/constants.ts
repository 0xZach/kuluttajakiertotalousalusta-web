export const COMMON_HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};

export const HTTP_METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

export const ResponseTypes = {
    SUCCESS: 'SUCCESS',
    FAILURE: 'FAILURE',
};

export const DEFAULT_LANGUAGE = 'fi-FI';

export const LANGUAGE_CODES = ['en-GB', 'fi-FI'];

export const getLocaleCode = (locale: string) => locale.split('-')[0];
export const getLangKey = (locale: string) => `LANGUAGES.${locale.toUpperCase()}`;

export const defaultLocation: Address = {
    latitude: 60.17823312780841,
    longitude: 24.9403786973217,
    city: 'Helsinki',
    country: 'Finland',
    streetAddress: 'Helsinki, Finland',
};

export const helsinkiCoordinates: Coordinates = {
    latitude: 60.17823312780841,
    longitude: 24.9403786973217,
};

export const DEFAULT_GROUP = 'no_group';
