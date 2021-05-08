import { MessageEmbed } from "discord.js"
import { Bot } from "../../entities/Client"

export default new class InteractionEvent {
  public name = "INTERACTION_CREATE"

  public async start(client: Bot, interactions): Promise<void> {
    const command = interactions.data.name.toLowerCase()
    const args = interactions.data.options
  }
}