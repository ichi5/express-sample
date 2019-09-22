import express from 'express';
import passport from 'passport';
import * as appController from '../controllers/appController';
import { isAuthenticated } from '../configs/passport';

export default class Router {
    public static initialize(app: express.Express) {
        app.get('/login', appController.getLogin);
        app.get('/logout', appController.getLogout);
        app.post(
            '/login',
            passport.authenticate('local', { failureRedirect: '/login' }),
            appController.postLogin,
        );
        app.get('/', isAuthenticated, appController.getIndex);
    }
}
