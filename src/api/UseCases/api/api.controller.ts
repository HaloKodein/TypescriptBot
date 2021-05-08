import { Response } from "express";
import { ReqParsed } from '../../../interfaces';
import { client } from '../../../index';

export default new class ApiController {
  public async handle(req: ReqParsed, res: Response): Promise<void> {
    return res.status(200).send()
  }
}
