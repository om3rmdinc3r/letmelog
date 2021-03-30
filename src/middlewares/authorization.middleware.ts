import { Request, Response, NextFunction } from "express"
import * as jwt from "jsonwebtoken"
import config from "../config/env"
import TokenNotFoundError from "../exceptions/CustomErrors/AuthorizationMiddlewareErrors/TokenNotFoundError"
import AuthorizationMiddlewareError from "../exceptions/CustomErrors/AuthorizationMiddlewareErrors/AuthorizationMiddlewareError"
import JsonTokenError from "../exceptions/CustomErrors/AuthorizationMiddlewareErrors/JsonTokenError"


export const JwtControl = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.headers.authorization) {
            next(new TokenNotFoundError("Authorization Token Not Found"))
        }
        else {
            const accessToken = req.headers.authorization.split(" ")[1];
            try {
                const verify = <any>jwt.verify(accessToken, config.jwtToken)
                next();
            }
            catch (e) {
                next(new JsonTokenError(e.message))
            }
        }
    }
    catch (e) {
        next(new AuthorizationMiddlewareError(e.message))
    }
}
// export const AdminRoleControl = (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const token = <string>req.headers.authorization.split(" ")[1];
//         const payload = <any>jwt.verify(token, config.jwtToken)
//         if (payload.role === config.admin_role) {
//             next();
//         }
//         else {
//             next(new NotAuthorizedError("User Not Authorized"))
//         }
//     }
//     catch (e) {
//         next(new AuthorizationMiddlewareError(e.message))
//     }

// }