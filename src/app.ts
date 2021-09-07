import config from 'config';
import Bot from './bot/bot';
import logger from './lib/logger';
import { IConfig } from './models/config.interface';
// import dbConnector from './db/connector'; //Uncomment this line when db connection configured properly

const log = logger.child({ name: 'app.ts' });
const environment: string = config.get('env');
log.info(`Starting app with environment: ${environment}`);

(async () => {
    try {
        const port: any = process.env.PORT || config.get<IConfig['api']>('api').port;

        log.info('Connecting database...');
        // await dbConnector.createConnection(); //Uncomment this line when db connection configured properly
        log.info('✓ Database connected');
        log.info('Starting server...');
        const bot = new Bot();
        bot.start();
    } catch (e) {
        log.error(e);
        process.exit(1);
    }
})();