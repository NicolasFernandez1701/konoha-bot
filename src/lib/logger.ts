import config from 'config';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import 'colors';
import { IConfig } from '../models/config.interface';

/** This method prints the metadata excluding some fields we are not interested */
const excludedMeta = ['meta', 'message', 'timestamp', 'level', 'message'];
const printMeta = (meta: any) => Object.keys(meta)
    .filter(k => !excludedMeta.includes(k))
    .map(k => `[${meta[k]}]`).join(' ');


const level = config.get<IConfig['logger']>("logger").level || 'info';

/** This transport prints the logs in console */
export const consoleTransport = new winston.transports.Console({
    level,
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss.SSS'
        }),
        winston.format.simple(),
        winston.format
            .printf(info => `${info.timestamp} ${printMeta(info)} `.grey
                + ` ${info.level}: ${info.message} `)
    )
});

/** This transport prints the logs in daily rotate files */
export const fileRotateTransport = new winston.transports.DailyRotateFile({
    filename: `${__dirname}/../logs/app-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    level,
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss.SSS'
        }),
        winston.format.simple(),
        winston.format
            .printf(info => `${info.timestamp} ${printMeta(info)} ${info.level}: ${info.message} `)
    )
});

/** Default export with the logger */
export default winston.createLogger({
    transports: [
        consoleTransport,
        fileRotateTransport,
    ]
});