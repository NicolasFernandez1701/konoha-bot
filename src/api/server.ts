import config from 'config';
import cors from 'cors';
import express from 'express';
import expressLogger from '../lib/expressLogger';
import logger from '../lib/logger';
import { IConfig } from '../models/config.interface';
import exceptionHandler from './middlewares/exceptionHandler';
import apiRoutes from './routes/api.routes';

const log = logger.child({ name: 'server.ts'});

const apiVersion = config.get<IConfig['api']>('api').version;

export default class Server {
    private app: express.Application;

    constructor(public port: number) {
        this.app = express();
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(expressLogger.mdw);
        this.initRoutes();
        this.app.use(exceptionHandler.internal);
    }
    
    private initRoutes() {
        this.app.use(`/api/v${apiVersion}`, apiRoutes);
        this.app.use('/api/*', exceptionHandler.notFound);
    }

    start() {
        this.app.listen(this.port, () => {
            log.info(`✓ Server listening on port ${this.port}`);
        });
    }
}