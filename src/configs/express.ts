import express from 'express';
import passport from 'passport';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';
import Router from '../routes';

const app = express();

const sessionOptions: session.SessionOptions = {
    secret: '1qazxsw2',
    resave: false,
    saveUninitialized: false,
    cookie: {
        path: '/',
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60 * 1000,
    },
};

app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'ejs');
app.set('port', 3000);
app.set('x-powered-by', false);

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

Router.initialize(app);

export default app;
