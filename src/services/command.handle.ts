import { ICommand, ICommandObj } from '../interfaces';
import { events } from '../utils/events';
import fs from 'fs';

class Command {
  constructor(){
    this.init();
  }

  public commands = new Map<String, ICommand>();
  public aliases = new Map<String, string>();

  public async init(): Promise<void> {
    await fs.readdir("./src/commands", (err, files) => {
      if (err) return console.log(err.message);
      files.forEach(async cmd => {
        if (!cmd.endsWith(".ts")) return;
        const command:ICommandObj = await import(`../commands/${cmd}`);
        events.emit("LOAD_COMMAND", command.default.help.name.toLowerCase())
        this.commands.set(command.default.help.name.toLowerCase(), command.default);
        command.default.help.aliases.forEach(e => {
          this.aliases.set(e, command.default.help.name.toLowerCase());
        })
      })
    })
  }

  public async handle(client, message, args, command:string): Promise<void> {
    const cmd = this.findCommand(command);
    if (!cmd) return;

    try {
      cmd.execute(client, message, args);
    } catch(err) {
      events.emit("LOAD_COMMAND_ERROR", err.message);
    }
  }

  public findCommand(command) {
    return this.commands.get(command) ?? this.commands.get(this.aliases.get(command));
  }
}

export { Command }