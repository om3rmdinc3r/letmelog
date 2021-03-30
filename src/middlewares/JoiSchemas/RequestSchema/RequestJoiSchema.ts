import * as Joi from "joi"
import { NextFunction, request, Request, Response } from "express"
import RequestJoiError from "../../../exceptions/CustomErrors/JoiValidationErrors/RequestErrors/RequestJoiError"


export default class RegisterJoiSchema {

    async requestSchema(req: Request, res: Response, next: NextFunction) {
        const requestSchema = Joi.object({
            owner_id: Joi.string().required(),
            name: Joi.string(),
            url: Joi.string().required(),
            period: Joi.number().required(),
            method: Joi.string(),
            type: Joi.string()
        }).options({ abortEarly: false })

        const _request = req.body;

        try {
            const dummie = requestSchema.validateAsync(_request)
            next();
        }
        catch (e) {
            next(new RequestJoiError(e.message))
        }
    }

}

