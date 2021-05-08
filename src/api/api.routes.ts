import { Router } from 'express';
import passport from 'passport';
import { client } from '../index';
import ApiController from './UseCase/api'
const router = Router();

router.get('/', (req, res) => {
  MApiController.handle(req, res);
})

export default router;
