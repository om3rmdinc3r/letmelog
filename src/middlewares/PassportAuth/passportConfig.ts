import { Strategy } from 'passport-local';
import UserService from '../../services/UserService/User.Service';
import * as passport from 'passport';
import { IUser } from '../../database/Interfaces/UserInterface/IUser';
import * as express from 'express';

const LocalStrategy = Strategy;
const userService = new UserService();

export const initialize = (passport) => {
	const authenticateUser = async (username, password, done) => {
		try {
			const user = await userService.FindUserByUsername(username);
			if (!user) {
				return done(null, false, { message: 'Wrong Username' });
			} else if (!(await userService.IsPasswordValid(password, user.password))) {
				return done(null, false, { message: 'Wrong Password' });
			}
			return done(null, user);
		} catch (e) {
			done(e);
		}
	};
	passport.use(
		new LocalStrategy(
			{
				usernameField: 'username',
				passwordField: 'password'
			},
			authenticateUser
		)
	);

	passport.deserializeUser(async (id: IUser['id'], done) => {
		try {
			const user: IUser = await userService.FindUserById(id);
			return done(null, user);
		} catch (e) {
			done(e);
		}
	});

	passport.serializeUser((user: IUser, done) => {
		return done(null, user.id);
	});
};
