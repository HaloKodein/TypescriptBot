import fs from 'fs'
import { events } from '../utils/events'

export class Event {
  constructor(private client){}

  public async handle():Promise<void> {
    await fs.readdir("./src/events/", async (err, files) => {
      files.forEach(async evt => {
        if (err) return events.emit("LOAD_EVENTS_ERROR", err.message)
        if (evt.split('.').slice(-1)[0] !== 'ts') return
        const { default: event } = await import(`../events/${evt}`)
        this.client.on(event.name, event.invoke.bind(null, this.client))
        events.emit("LOAD_EVENTS", event.name)
      })
    })
  }
}
