import * as expressWinston from 'express-winston';
import 'winston-daily-rotate-file';
import 'colors';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response, NextFunction } from 'express';
import { consoleTransport, fileRotateTransport } from './logger';

import { parseIp } from '../utils/helpers-functions';

/** This module is integrated with ./logger.ts and log all express http requests. */

export default {
    /** This method gives you the request id.
     *  You may pass this method to the logger as metadata
     */
    getMeta: (req: Request) => ({reqId: req.headers.reqId}),
    /** This middleware logs all requests
     * It must be used before all your routes.
     * It sets the attribute reqId into req.headers to identify all your request in logs.
     * It also sets the atrribute req.ip_address into req.headers.
     */
    mdw: (req: Request, res: Response, next: NextFunction) => {
        const reqId = uuidv4();
        req.headers.reqId = reqId;
        (req as any).ip_address = parseIp(req) || req.ip;
        if ((req as any).ip_address.startsWith("::ffff:")) (req as any).ip_address = (req as any).ip_address.replace("::ffff:", "");
        return expressWinston.logger({
            transports: [
                consoleTransport,
                fileRotateTransport
            ],
            meta: true,
            baseMeta: {
                namespace: 'request-logger',
                // reqIp: req.ip_address,
                reqId
            },
            msg: 'HTTP {{req.method}} {{req.url}}',
            expressFormat: true,
            colorize: false
        })(req, res, next);
    }
}