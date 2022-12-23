import {NextApiRequest, NextApiResponse} from 'next';
import {request} from 'src/util/request';
import {StatusCodes} from 'http-status-codes';
import {runTimeServerConfig} from 'src/util/common';

const locationRequestHandler = async (req: NextApiRequest, res: NextApiResponse<ApiResponse>) => {
    const params = req.query;
    const requestObject: ApiRequest = {
        url: `https://geolocation-db.com/json/${runTimeServerConfig().IP_LOCATION_SERVICE_KEY}/${params.ip}`,
        method: 'GET',
        isServer: true,
    };

    try {
        const response = (await request(requestObject)) as unknown as IPLocationResponse;

        if (typeof response.latitude === 'number') {
            return res.status(200).send({
                success: {
                    code: 200,
                    message: 'success',
                    data: response as unknown as AnyObject,
                },
                error: null,
            });
        }
        return res.status(200).send({
            success: null,
            error: {
                code: 404,
                message: 'not found',
                data: {},
            },
        });
    } catch (err) {
        return {code: StatusCodes.INTERNAL_SERVER_ERROR, error: err};
    }
};

const handler = async (req: NextApiRequest, res: NextApiResponse<ApiResponse>) => {
    await locationRequestHandler(req, res);
    res.end();
};

export default handler;
