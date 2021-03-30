import axios, { AxiosResponse } from "axios"

import { INewLog } from "../database/Interfaces/LogInterface/INewLog";
import { INewRequest } from "../database/Interfaces/RequestInterface/INewRequest";
import { IRequest } from "../database/Interfaces/RequestInterface/IRequest";

import LoggingService from "../services/LogService/Log.Service"


export default class LoggerClass {
    private request_id: string
    private owner_id: string;
    private timer: NodeJS.Timer;
    private delay: number;
    private url: string;
    private method: string;
    private type: string;
    private LoggingService: LoggingService

    constructor(request: IRequest) {

        this.request_id = request.id
        this.owner_id = request.owner_id

        this.url = request.url;
        this.delay = this.delayAsMilliseconds(request.period);

        this.method = request.method;
        this.type = request.type;

        this.LoggingService = new LoggingService();

        axios.defaults.timeout = 1000
        this.timer = global.setTimeout(this.LoggingFunction.bind(this), 5)
    }

    private async LoggingFunction(): Promise<boolean> { // pass a Request Object 
        try {
            const response: AxiosResponse = await axios.get(this.url, {
                validateStatus: function (status) {
                    return status >= 200 && status < 300; // Resolve only if the status code is less than 500
                }
            })
            const newLog: INewLog = {
                owner_id: this.owner_id,
                url: this.url,
                statusCode: response.status,
                method: this.method,
                type: this.type
            }
            const result = await this.LoggingService.AddNewLog(newLog)
            setTimeout(() => this.timer.refresh(), this.delay)
            return result
        }
        catch (e) {
            const newLog: INewLog = {
                owner_id: this.owner_id,
                url: this.url,
                statusCode: 404,
                method: this.method,
                type: this.type
            }
            const result = await this.LoggingService.AddNewLog(newLog)
            setTimeout(() => this.timer.refresh(), this.delay)
            return result
        }
    }

    //helpers
    delayAsMilliseconds(delayAsMinute: number) {
        return delayAsMinute * 60000
    }

    async StopTimer() {
        clearTimeout(this.timer)
    }
    async GetRequestId() {
        return this.request_id
    }
}