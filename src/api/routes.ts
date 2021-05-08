import { Router } from 'express';
import MainController from './UseCases/main/main.controller';
import UserController from './UseCases/user/user.controller';
import passport from 'passport';
import { client } from '../index';
const router = Router();

router.get('/', (req, res) => {
  MainController.handle(req, res);
})

router.get('/user/:id', (req, res) => {
  UserController.handleUser(req, res, client);
});

router.get('/login', (req, res, next) => {
  UserController.handleLogin(req, res, next);
},
passport.authenticate('discord'))

router.get('/logout', (req, res) => {
  UserController.handleLogout(req, res);
})

router.get('/callback', passport.authenticate('discord', {
  failureRedirect: '/autherror'
}), (req, res) => {
  UserController.handleCallback(req, res);
});

export default router;