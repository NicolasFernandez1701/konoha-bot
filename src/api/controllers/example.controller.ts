import { Request, Response, NextFunction } from 'express';
import expressLogger from '../../lib/expressLogger';
import logger from '../../lib/logger';

import { createCustomError } from '../../utils/helpers-functions';

const log = logger.child({ name: 'example.controller.ts'});

export default {
    example: async (req: Request, res: Response, next: NextFunction) => {
        try {
            log.info('Example controller', expressLogger.getMeta(req));

            res.json({ok: true, msg: 'Ok!'});
        } catch (err) {
            next(createCustomError(err, 1000));
        }
    }
}