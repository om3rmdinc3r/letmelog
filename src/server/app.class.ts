import { Request, Response, NextFunction } from 'express';
import * as express from 'express';
import * as config from '../config/env';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as session from 'express-session';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';

import { LoginRouter } from '../routes/UserRoute/LoginRoute/Login.Route';
import { RegisterRouter } from '../routes/UserRoute/RegisterRoute/Register.Route';
import { UserRouter } from '../routes/UserRoute/User.Route';
import { RequestRouter } from '../routes/RequestRoute/Request.Route';
import { LoggingRouter } from '../routes/LogRoute/Log.Route';

import { errorMiddleware } from '../middlewares/error.middleware';

import Authentication from '../middlewares/authentication.middleware';

const flash = require('express-flash');

///////////////////////

import RequestService from '../services/RequestService/Request.Service';
import LogService from '../services/LogService/Log.Service';

//Passport
import * as passport from 'passport';
import * as initPassport from '../middlewares/PassportAuth/passportConfig';
import UserService from '../services/UserService/User.Service';

class App {
	private app: express.Application;
	private Authentication = new Authentication();

	constructor() {
		this.app = express();
		this.config();
		this.initRoutes();
		this.initMiddleware();
	}

	config() {
		this.app.use(cors());
		this.app.use(
			helmet({
				contentSecurityPolicy: false
			})
		);
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(cookieParser(config.default.cookie_secret));

		this.app.use(express.static(path.join(__dirname, '../public')));
		this.app.set('view engine', 'ejs');
		this.app.set('views', path.join(__dirname, '../public/views'));

		this.app.use(flash());

		initPassport.initialize(passport);

		this.app.use(
			session({
				secret: config.default.session_secret,
				resave: true,
				saveUninitialized: false
			})
		);
		this.app.use(flash());

		this.app.use(passport.initialize());
		this.app.use(passport.session());
	}

	initRoutes() {
		this.app.get('/', (req: express.Request, res: express.Response) => {
			res.redirect('/index');
		});
		this.app.get('/index', (req: express.Request, res: express.Response) => {
			res.render('index');
		});

		this.app.use(LoginRouter);

		this.app.use(RegisterRouter);

		this.app.use('/main', [this.Authentication.checkAuthenticated], (req: Request, res: Response) => {
			res.render('main');
		});

		this.app.use('/user', UserRouter);

		this.app.use('/request', RequestRouter);

		this.app.use('/log', LoggingRouter);

		this.app.get('/logout', (req: Request, res: Response) => {
			req.logOut();
			res.redirect('/login');
		});
	}

	private initMiddleware() {
		this.app.use(errorMiddleware);
	}

	public StartApp() {
		this.app.listen(config.default.APP_PORT, () => {
			console.log(`http://localhost:${config.default.APP_PORT}`);
		});
	}
}

export default App;
