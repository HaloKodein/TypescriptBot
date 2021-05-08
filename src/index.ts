import config from './config';
import { Bot } from './entities/Client';

const client = new Bot(config)

export { client }