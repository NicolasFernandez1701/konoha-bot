import { Message } from "discord.js";
import Bot from "../bot";

export default async (message: Message, args: string[]) => {
    if (!message.guild) return;
    if (!message.member?.voice.channel) {
        message.reply('You need to join a voice channel first!');
        return;
    }
    Bot.instance.dispatcher?.destroy();
}