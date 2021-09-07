import config from 'config';
import logger from '../lib/logger';
import { Client, StreamDispatcher } from 'discord.js';

import { IConfig } from '../models/config.interface';

const log = logger.child({ name: 'bot.ts'});
const token = config.get<IConfig['bot']>("bot").token;

import { commandHandler } from './commandHandler';

export default class Bot {

    public dispatcher: StreamDispatcher | null = null;
    private static _instance: Bot;
    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    constructor() {
    }

    start() {
        const bot = new Client();
        this.listen(bot);
        bot.login(token);
    }

    listen(bot: Client) {
        bot.once('ready', () => {
            log.info(`✓ Bot started`);
        });
        
        bot.on('message', commandHandler);
    }
}