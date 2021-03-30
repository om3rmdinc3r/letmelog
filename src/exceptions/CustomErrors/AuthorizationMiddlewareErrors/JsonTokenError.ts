import BaseError from "../../BaseError"

export default class JsonTokenError extends BaseError {

    constructor(message) {
        super(message,"JWT Authorization Error",401,"Json Web Token Error")
    }
}