import { Request, Response, NextFunction, Router } from "express"

import UserService from "../../services/UserService/User.Service"
import * as userErrors from "../../exceptions/CustomErrors/UserErrors/UserRouteErrors/index"

import Authentication from "../../middlewares/authentication.middleware";

import { IUsers } from "../../database/Interfaces/UserInterface/IUsers";
import { IUser } from "../../database/Interfaces/UserInterface/IUser";

class UserRouteClass {
    router: Router;
    private UserService: UserService;
    private Authentication: Authentication

    constructor() {
        this.router = Router();
        this.UserService = new UserService()
        this.Authentication = new Authentication();
        this.initRouters();
    }

    async ListUsersRoute(req: Request, res: Response, next: NextFunction) {
        try {
            const users: IUsers = await this.UserService.GetUsers()

            const usersObj = Object.values(users)
            const data = []
            for (let item of usersObj) {
                data.push(Object.values(item))
            }
            const tablename = "Users";
            const columns = ["id", "username"]

            res.status(200)
            res.render('usertable', { data, columns, tablename })
        }
        catch (e) {
            next(new userErrors.errs.UserRouteError(e.message))
        }
    }

    async DeleteUserRoute(req: Request, res: Response, next: NextFunction) {
        try {
            const deleteUserId: IUser["id"] = req.body.payload

            if (deleteUserId == req.user["id"]) {
                res.json({ conflict: true })
            }
            else {
                const result = await this.UserService.DeletePersonById(deleteUserId)
                res.json({ success: result })
            }

        } catch (e) {
            next(new userErrors.errs.UserRouteError("Deleting User Failed"))
        }

    }

    initRouters() {
        this.router.use('/', [this.Authentication.checkAuthenticated])
        this.router.get('/list', this.ListUsersRoute.bind(this));
        this.router.delete('/delete', this.DeleteUserRoute.bind(this));

        // this.router.post('/login',
        //     [this.UserJoiSchema.loginSchema.bind(this), this.UserAuthentication.loginAuthentication.bind(this)],
        //     this.loginRoute.bind(this))
    }
}
export const UserRouter = new UserRouteClass().router