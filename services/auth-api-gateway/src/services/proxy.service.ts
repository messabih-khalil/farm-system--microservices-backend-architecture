import axios from 'axios';
import { Request, Response } from 'express';
import { logger } from '../utils/logger';

export class ProxyService {
    static async forwardRequest(
        req: Request,
        res: Response,
        serviceUrl: string
    ) {
        try {
            const { method, path, body, headers } = req;
            console.log(`${serviceUrl}${path} <=`);

            const response = await axios({
                method,
                url: `${serviceUrl}${path}`,
                data: body,
                headers: {
                    ...headers,
                    // Strip out any existing authorization header for security
                    Authorization: undefined,
                },
            });

            res.status(response.status).json(response.data);
        } catch (error) {
            logger.error('Proxy request failed', {
                error,
                serviceUrl,
                path: req.path,
            });

            if (axios.isAxiosError(error)) {
                res.status(error.response?.status || 500).json(
                    error.response?.data || { message: 'Proxy Error' }
                );
            } else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    }
}
