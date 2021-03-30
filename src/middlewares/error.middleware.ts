import { Response, Request, NextFunction } from "express";
import BaseError from "../exceptions/BaseError"

export const errorMiddleware = async (err: BaseError, req: Request, res: Response, next: NextFunction) => {

    const errObj = {
        type: err.type,
        message: err.message,
        statusCode: err.statusCode,
        info: err.info
    }
    //res.status(err.statusCode).send(errObj);
    res.render('err/err', { res: errObj })
}
