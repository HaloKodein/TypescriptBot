import { Response } from "express";
import { ReqParsed } from '../../../interfaces';
import { client } from '../../../index';

export default new class MainController {
  public async handle(req: ReqParsed, res: Response): Promise<void> {
    return res.status(200).render('home.handlebars', {
      layout: false,
      title: client.user.username,
      user: req.user ? req.user : false
    })
  }
}