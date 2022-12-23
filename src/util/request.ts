import axios, {AxiosResponse, Method} from 'axios';
import queryString from 'query-string';
import {COMMON_HEADERS, DEFAULT_LANGUAGE} from 'src/util/constants';
import {runTimeServerConfig} from 'src/util/common';

const getBaseUrl = (): string => {
    const BASE_API = runTimeServerConfig().BASE_API;
    return `${BASE_API}`;
};

const getParams = (params?: AnyObject) => {
    if (!params) return '';
    const parsedParams = queryString.stringify(params);
    return `?${parsedParams}`;
};

const getUrl = <T>(args: ApiRequest<T>) => {
    const {path, isServer} = args;
    const url = isServer ? `${getBaseUrl()}/${path}` : `/api/${path}`;
    return url;
};

const createOptions = async <T>(
    method: Method = 'GET',
    isServer?: boolean,
    data?: T,
    locale?: string,
    headers?: headers,
) => {
    const options: ApiRequest<T> = {
        method,
        headers: {...COMMON_HEADERS, ...headers},
    };
    if (data) options.data = data;
    if (options.headers) {
        if (isServer) {
            options.headers['Accept-Language'] = locale || DEFAULT_LANGUAGE;
        }
    }
    return options;
};

const request = async <T, R = AnyObject>(args: ApiRequest<T>): Promise<ApiResponse<R>> => {
    try {
        const {method, params, data, isServer, locale, url, headers} = args;
        const requestUrl = url || `${getUrl<T>(args)}${getParams(params)}`;
        const options = await createOptions(method, isServer, data, locale, headers);
        const response: AxiosResponse<ApiResponse> = await axios({...options, url: requestUrl});
        return response.data as ApiResponse<R>;
    } catch (error) {
        console.log('API Exception::', error);
        return {
            error: {
                code: 500,
                message: 'RESPONSE.DEFAULT.ERROR',
                data: {},
            },
        } as ApiResponse<R>;
    }
};

export {request};
