import * as Joi from "joi"
import { NextFunction, Request, Response } from "express"

import { ILoginUser } from "../../../database/Interfaces/UserInterface/ILoginUser"
import { IRegisterUser } from "../../../database/Interfaces/UserInterface/IRegisterUser"
import * as joierr from "../../../exceptions/CustomErrors/JoiValidationErrors/UserErrors"


export default class UserJoiSchema {

    async loginSchema(req: Request, res: Response, next: NextFunction) {
        const LoginSchema = Joi.object({
            username: Joi.string().min(4).required(),
            password: Joi.string().min(4).required(),
        }).options({ abortEarly: false })

        const _user: ILoginUser = req.body;
        try {
            const dummie = await LoginSchema.validateAsync(_user);
            next();
        }
        catch (e) {
            return res.render('login', { message: "Sign In Credential Not Correct" })
            //next(new joierr.errs.SignInError(e.message))
        }
    }

    async registerValidate(req: Request, res: Response, next: NextFunction) {
        const registerSchema = Joi.object({
            username: Joi.string().min(4).required(),
            password: Joi.string().min(4).required(),
        }).options({ abortEarly: true })

        const _registerUser: IRegisterUser = req.body;
        try {
            const dummie = await registerSchema.validateAsync(_registerUser);
            next();
        }
        catch (e) {
            next(new joierr.errs.RegisterError(e.message))
        }
    }
}
