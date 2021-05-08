import { events } from '../utils/events';
import dashboard from '../api/app';
import { Bot } from '../entities/Client';

export default new class ReadyEvent {
  public name = "ready"

  public async start(client: Bot): Promise<void> {
    dashboard(client)

    try {
      await client.user.setActivity("Canary", { type: "STREAMING", url: "https://twitch.tv/security" });
    } catch(err) {
      throw new Error(err.message)
    }
    
    events.emit("CLIENT_READY", client.guilds.cache.size);
  }
}