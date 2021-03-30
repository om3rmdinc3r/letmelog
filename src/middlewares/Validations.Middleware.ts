import { Request, Response, NextFunction } from "express";
import { IRegisterUser } from "../database/Interfaces/UserInterface/IRegisterUser";
import * as autherr from "../exceptions/CustomErrors/AuthenticationMiddlewareErrors/index"
import UserService from "../services/UserService/User.Service"



export default class Validations {

    private UserService: UserService;
    constructor() {
        this.UserService = new UserService();
    }

    async registerValidation(req: Request, res: Response, next: NextFunction) {
        const _user: IRegisterUser = req.body;
        try {
            if (await this.UserService.UserCheck(_user.username)) {
                next(new autherr.errs.DuplicatedCredentialsError("Duplicated Credentials"))
            }
            else {
                next();
            }
        }
        catch (e) {
            next(new autherr.errs.AuthenticationError(e.message));
        }
    }
}