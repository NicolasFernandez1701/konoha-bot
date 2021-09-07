import { Message } from "discord.js";

import hello from "./commands/hello";
import play from "./commands/play";
import stop from "./commands/stop";

const PREFIX = ".";

const commands: any = {
    hello,
    play,
    stop
}

export const commandHandler = async (message: Message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content
            .trim()
            .substring(PREFIX.length)
            .split(/\s+/);
        try {
            commands[CMD_NAME](message, args);
        } catch (error) {
            message.reply(`Command not found`);
        }
    }
}