export default class BaseError extends Error {

    statusCode: number; //404 , 401, 500 ...
    type: string; // Route,Service,DB,Validation ..
    info: string; // User Cannot Added , Validation Error ...

    constructor(message: string, type: string, statusCode: number, info: string) {
        super(message);
        this.statusCode = statusCode;
        this.type = type;
        this.info = info;
    }
}