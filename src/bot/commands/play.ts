import { Message } from "discord.js";
import ytdl from "ytdl-core";

import Bot from "../bot";

export default async (message: Message, args: string[]) => {
    if (!message.guild) return;
    if (!message.member?.voice.channel) return message.reply('You need to join a voice channel first!');
    if (args.length === 0) return message.reply("Please provide an url");
    const connection = await message.member.voice.channel.join();
    Bot.instance.dispatcher = connection.play(ytdl(args[0], { filter: 'audioonly' }));
}