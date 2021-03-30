import { Request, Response, NextFunction, Router } from "express";

import UserService from "../../../services/UserService/User.Service";
import * as userErrors from "../../../exceptions/CustomErrors/UserErrors/UserRouteErrors/index"
import Validations from "../../../middlewares/Validations.Middleware";

import { IResponse } from "../../../Helpers/ResponseHelper/IResponse";
import { IRegisterUser } from "../../../database/Interfaces/UserInterface/IRegisterUser";
import UserJoiSchema from "../../../middlewares/JoiSchemas/UserSchema/UserJoiSchema";


class RegisterRouteClass {
    router: Router;
    private UserService: UserService;
    private UserJoiSchema: UserJoiSchema;
    private Validations: Validations

    constructor() {
        this.router = Router();
        this.UserService = new UserService();
        this.UserJoiSchema = new UserJoiSchema();
        this.Validations = new Validations();
        this.initRoutes();
    }

    async registerRoute(req: Request, res: Response, next: NextFunction) {
        try {
            const _registerUser: IRegisterUser = req.body;
            const result = await this.UserService.AddNewUser(_registerUser);

            let response: IResponse = {
                statusCode: 201,
                ResponseData: {
                    message: "Successfully Created",
                    data: _registerUser,
                }
            }
            res.status(response.statusCode)
            res.redirect('login')
        } catch (e) {
            next(new userErrors.errs.UserRouteError(e.message))
        }
    }


    private initRoutes() {
        this.router.get('/register', (req: Request, res: Response) => {
            res.render('register', { message: "" })
        })
        this.router.post('/register',
            [this.UserJoiSchema.registerValidate, this.Validations.registerValidation.bind(this)],
            this.registerRoute.bind(this))
    }
}

export const RegisterRouter = new RegisterRouteClass().router