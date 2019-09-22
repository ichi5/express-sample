import express from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy, IStrategyOptions } from 'passport-local';
import Users from '../models/Users';
import * as UsersDao from '../repositories/UsersDao';

const optionLocalStrategy: IStrategyOptions = {
    usernameField: 'email',
    passwordField: 'password',
    session: true,
};

// ログイン認証
passport.use(new LocalStrategy(optionLocalStrategy, async (email: string, password: string, done: any) => {
    const data = await UsersDao.findLoginUser(email, password);
    if (data === null) {
        return done(null, false);
    } else {
        return done(null, data);
    }
}));

// セッションにユーザー情報を格納
passport.serializeUser((user: Users, done) => {
    done(null, user);
});

// セッションに格納されたユーザー情報の検証
passport.deserializeUser((user: Users, done) => {
    // TODO: ここでfindOne(user_id)を行いユーザー情報を検証するべき
    done(null, user);
});

// isAuthenticated はログイン済みかチェックします.
export function isAuthenticated(req: express.Request, res: express.Response, next: express.NextFunction): void {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/login');
    }
}
