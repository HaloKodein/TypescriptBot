import Discord, { Client, Intents } from 'discord.js'
import { Event } from '../services/event.handle'
import { IConfig } from '../interfaces'

class Bot extends Client {
  constructor(
    private config: IConfig
  ){
    super({ ws: { intents: Intents.ALL }, messageCacheMaxSize: 200, messageCacheLifetime: 180, messageEditHistoryMaxSize: 180 })
    this.event.handle()
    this.event.handleWebsockets()
    this.login(this.config.token)

    if (this.config.debug) this.on('debug', info => console.log(info))
    if (this.config.warn) this.on('warn', info => console.log(info))
  }

  private event = new Event(this)
}

export { Bot }