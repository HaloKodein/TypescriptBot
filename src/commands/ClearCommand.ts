import { Client, Message, MessageEmbed, TextChannel } from 'discord.js';
import { ICommand } from '../interfaces';

export default new class ClearCommand implements ICommand {
  constructor(){}

  public help = {
    name: "Clear",
    description: "Apaga as mensagens de um canal",
    aliases: ["purge","limpar"]
  }

  async execute(client: Client, message: Message, args): Promise<void> {
    const channel = message.channel as TextChannel;
    const count = args[0];

    if (!count) {
      message.channel.send("Especifique á quantidade!")
      return;
    } else if (isNaN(count)) {
      message.channel.send("Apenas numeros!")
      return;
    } else if (count >= 100) {
      message.channel.send("Apenas numeros abaixo de 100!")
      return;
    }

    await channel.bulkDelete(count).then(async msg => {
      const targets = msg.map(e => { if (e.author.bot) return; return e.content }) as string[];
      const embed = new MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL())
      .setDescription(`${msg.size} Mensagens foram excluidas!`)
      .setColor('#36393f')
      message.channel.send(embed);
    }).catch(error => message.channel.send("Não é possivel apagar mensagens de 14 semanas atras!"));
  }
}