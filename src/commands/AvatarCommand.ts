import { Client, Message, MessageEmbed } from "discord.js";
import { ICommand } from "../interfaces";

export default new class AvatarCommand implements ICommand {
  constructor(){}

  public help = {
    name: "Avatar",
    description: "Mostra o avatar",
    aliases: []
  }

  async execute(client: Client, message: Message, args): Promise<void> {
    const user = message.mentions.users.first() ?? client.users.cache.get(args[0]) ?? message.author;
    const avatar = user.displayAvatarURL({dynamic:true,size:2048});
    const embed = new MessageEmbed()
    .setDescription(`Avatar de [${user.username}](${avatar})`)
    .setFooter(`Executado por: ${message.author.username}`)
    .setImage(avatar);
    
    message.channel.send(embed)
  }
}