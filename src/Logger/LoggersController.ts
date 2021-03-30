
import { INewRequest } from "../database/Interfaces/RequestInterface/INewRequest";

import RequestService from "../services/RequestService/Request.Service"


import { IRequest } from "../database/Interfaces/RequestInterface/IRequest";
import { IRequests } from "../database/Interfaces/RequestInterface/IRequests";


import LoggerClass from "./LoggerClass"


class LoggersController {

    private RequestService: RequestService;
    private LoggerArray: Array<LoggerClass>


    constructor() {
        this.LoggerArray = [];
        this.RequestService = new RequestService();
        this.initLoggers();
    }

    async initLoggers() {
        const requestsObj = await this.serializeRequests()
        requestsObj.forEach(requestObject => {
            this.LoggerArray.push(new LoggerClass(requestObject))
        });
    }

    async AddNewRequest(newRequest: IRequest) {
        this.LoggerArray.push(new LoggerClass(newRequest))
    }

    async DeleteRequest(req_id: IRequest["id"]) {
        this.LoggerArray.forEach(async logWorker => {
            if (await logWorker.GetRequestId() === req_id) {
                logWorker.StopTimer();
                this.LoggerArray.splice(this.LoggerArray.indexOf(logWorker), 1)
            }
        })
    }
    //HELPERS
    private async serializeRequests() {
        const requests: IRequests = await this.RequestService.GetRequestList()
        const requestsObject = Object.values(requests)
        return requestsObject
    }

}
export const LetMeLogWorker = new LoggersController()