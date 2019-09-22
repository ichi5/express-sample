import express from 'express';

export const getIndex = (req: express.Request, res: express.Response) => {
    res.render('index', { title: 'index page' });
};

export const getLogin = (req: express.Request, res: express.Response) => {
    res.render('login', { title: 'login page' });
};

export const postLogin = (req: express.Request, res: express.Response) => {
    res.redirect('/');
};

export const getLogout = (req: express.Request, res: express.Response) => {
    req.logout();
    res.redirect('/login');
};
