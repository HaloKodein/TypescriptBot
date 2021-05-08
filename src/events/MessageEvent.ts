import { Command } from '../services/command.handle';
import config from '../config';
import { Bot } from '../entities/Client';
import { Message } from 'discord.js';
const cmd = new Command();

export default new class MessageEvent {
  public name = "message"

  public async invoke(client: Bot, message: Message): Promise<void> {
    if (message.author.bot) return;
    if (!message.content.includes(config.prefix)) return;
    if (message.channel.type == "dm") return;

    const args = message.content.slice(config.prefix.length).split(" ");
    const command = args.shift().toLowerCase();

    if (!command) return;
    await cmd.handle(client, message, args, command);
  }
}
