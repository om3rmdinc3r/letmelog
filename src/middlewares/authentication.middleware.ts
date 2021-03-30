import { Request, Response, NextFunction } from "express";
import * as autherr from "../exceptions/CustomErrors/AuthenticationMiddlewareErrors/index"
import { ILoginUser } from "../database/interfaces/UserInterface/ILoginUser"

import UserService from "../services/UserService/User.Service";
import { IUser } from "../database/Interfaces/UserInterface/IUser";
import { IRegisterUser } from "../database/Interfaces/UserInterface/IRegisterUser";

export default class Authentication {

    private UserService: UserService;

    constructor() {
        this.UserService = new UserService();
    }

    async checkAuthenticated(req: Request, res: Response, next: NextFunction) {
        if (await req.isAuthenticated()) {
            next();
        }
        else {
            return res.redirect('/login')
        }
    }
    async checkNotAuthenticated(req: Request, res: Response, next: NextFunction) {
        if (req.isAuthenticated()) {
            return next();
        }
        else {
            return res.redirect('/login')
        }

    }




    async loginAuthentication(req: Request, res: Response, next: NextFunction) {
        const _user: ILoginUser = req.body;
        try {
            let user: IUser = await this.UserService.FindUserByUsername(_user.username) // undefined or user
            if (!user) {
                //next(new autherr.errs.UsernameNotFound("Username is Invalid or Wrong"));
                return res.render('login', { message: "Username is Invalid or Wrong" })
            }
            else if (!(await this.UserService.IsPasswordValid(_user.password, user.password))) { // if password is wrong
                //next(new autherr.errs.PasswordWrong("Wrong Password"));
                return res.render('login', { message: "Wrong Password" })

            }
            next();
        }
        catch (e) {
            next(e)
        }

    }
}

