import handleBars from 'express-handlebars';
import { Strategy } from 'passport-discord';
import { events } from '../utils/events';
import session from 'express-session';
import bodyParser from 'body-parser';
import passport from 'passport';
import config from '../config';
import express from 'express';
import routes from './routes';
import apiRotes from './api.routes';
import path from 'path';

export default (client) => {
  const app = express();
  const port = process.env.PORT ?? 3000;
  const dataDir = path.resolve(`${process.cwd()}${path.sep}/src/api/client`)
  
  app.use('/public', express.static(path.resolve(`${dataDir}${path.sep}public`), { maxAge: '10h' }));
  app.use('/js', express.static(path.resolve(`${dataDir}${path.sep}js`), { maxAge: '10h' }));
  
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });
  
  passport.use(new Strategy({
    clientID: config.clientid,
    clientSecret: config.dashboard.oauthSecret,
    callbackURL: config.dashboard.callbackURL,
    scope: ['identify', 'guilds']
  },
  (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => done(null, profile));
  }))
  
  app.set('views', path.resolve(`${__dirname}${path.sep}client${path.sep}views`));
  app.set('view options', { layout: null });
  app.engine('handlebars', handleBars());
  app.set('view engine', 'handlebars');
  
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  
  app.use(session({
    secret: config.dashboard.sessionSecret,
    resave: true,
    saveUninitialized: false,
  }));

  app.use(passport.initialize());
  app.use(passport.session());
  
  app.use(express.json());
  app.use(process.env.API_ENDPOINT, apiRoutes);
  app.use(process.env.FRONT_ENDPOINT, routes);

  app.listen(port, () => events.emit("SERVER_READY", port))
}
