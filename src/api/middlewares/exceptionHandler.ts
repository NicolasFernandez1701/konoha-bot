import { Request, Response, NextFunction } from 'express';
import expressLogger from '../../lib/expressLogger';
import logger from '../../lib/logger';

import { validToShowErrorMessage } from '../../utils/vaild-error-codes';

const log = logger.child({namespace: 'exceptionHandler.ts'});

export default {
    notFound: (req: Request, res: Response, next: NextFunction) => {
        log.error(`${req.baseUrl} not found`);
        res.status(404).json({
            ok: false,
            error: {
                status: 404,
                message: `${req.baseUrl} not found`
            }
        });
    },
    internal: (error: any, req: Request, res: Response, next: NextFunction) => {
        log.error(`${error.message} - code: ${error.code} ${error.stack ? '\n'+error.stack : ""}`, expressLogger.getMeta(req));
        res.status(error.status || 500);
        res.json({
            ok: false,
            error: {
                status: error.status || 500,
                message: validToShowErrorMessage(error.code) ? error.message || "Internal server error" : "Internal server error",
                code: error.code || -1,
                data: error.data
            }
        });
    }    
}