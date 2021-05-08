import { Client, User } from 'discord.js'
import { Request } from 'express'

interface IHelp {
  name: string;
  description: string;
  aliases: string[];
}

interface ICommand {
  help: IHelp;
  execute(client, message, args): Promise<void>;
}

interface ICommandObj {
  default: ICommand;
}

interface Back {
  backURL: string
}

interface Req extends Request {
  session: Back;
  logout();
}

interface ReqParsed extends Request {
  user?: User;
}

interface DashboardConfig {
  sessionSecret: string;
  oauthSecret: string;
  callbackURL: string;
}

interface IConfig {
  token: string;
  owner: string;
  clientid: string;
  prefix: string;
  debug: boolean;
  warn: boolean;
  dashboard: DashboardConfig;
}

interface EventStarter {
  (client: Client, ...args): Promise<void>
}

interface IEvent {
  name: string;
  start: EventStarter;
}

interface Interaction {
  channel_id: string;
}

export { ICommand, ICommandObj, Interaction, IConfig, IHelp, IEvent, Req, ReqParsed }