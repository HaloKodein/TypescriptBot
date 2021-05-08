import { Client } from 'discord.js';
import { Response } from 'express';
import url from 'url';
import { Req, ReqParsed } from '../../../interfaces';

export default new class UserController {
  public async handleLogin(req: Req, res: Response, next): Promise<void> {
    let back = req.session.backURL as string;
    if (back) {
      back = back;
    } else if (req.headers.referer) {
      const parsed = url.parse(req.headers.referer);
      back = parsed.path;
    } else {
      back = '/user/me';
    }
    next();
  }

  public async handleLogout(req: ReqParsed, res: Response): Promise<void> {
    req.logout();
    res.redirect('/');
  }
  
  public async handleCallback(req: Req, res: Response): Promise<void> {
    let back = req.session.backURL as string;
    if (back) {
      res.redirect(back);
      back = null;
    } else {
      res.redirect('/');
    }
  }

  public async handleUser(req: ReqParsed, res: Response, client: Client): Promise<void> {
    const user = client.users.cache.get(req.params.id);
    
    res.status(200).render('user.handlebars', {
      title: `${req.user.username} Perfil`,
      client: req.user ? req.user : false,
      isUser: user.id == req.user.id ? true : false,
      layout: false,
      user: user,
      bot: client,
    })
  }
}