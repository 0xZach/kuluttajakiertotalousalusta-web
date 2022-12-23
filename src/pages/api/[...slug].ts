import {NextApiRequest, NextApiResponse} from 'next';
import {request} from 'src/util/request';
import {StatusCodes} from 'http-status-codes';
import {Method} from 'axios';
import {DEFAULT_LANGUAGE} from 'src/util/constants';

const requestHandler = async (req: NextApiRequest, res: NextApiResponse<ApiResponse>) => {
    const slug = req.query.slug as string[];
    const path = slug?.join('/');
    const token = req.headers.token as string;
    const locale = (req.cookies.NEXT_LOCALE as string) || DEFAULT_LANGUAGE;
    const params = req.query;
    delete params.slug;
    const requestObject: ApiRequest = {
        path,
        token,
        method: req.method as Method,
        isServer: true,
        params,
        locale,
    };
    if (req.body) requestObject.data = req.body;

    try {
        const response = await request(requestObject);
        return res.status(200).json(response);
    } catch (err) {
        return {code: StatusCodes.INTERNAL_SERVER_ERROR, error: err};
    }
};

const handler = async (req: NextApiRequest, res: NextApiResponse<ApiResponse>) => {
    await requestHandler(req, res);
    res.end();
};

export default handler;
