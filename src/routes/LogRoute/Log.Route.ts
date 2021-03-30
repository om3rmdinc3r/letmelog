import { Request, Response, NextFunction, Router, request } from "express"
import LoggingService from "../../services/LogService/Log.Service"

import { LogTable } from "../../database/Enums/LogTable.enum"
import Authentication from "../../middlewares/authentication.middleware"

import LogRouteError from "../../exceptions/CustomErrors/LogErrors/LogRouteError/LogRouteError"
import { ILogs } from "../../database/Interfaces/LogInterface/ILogs"
import { ILog } from "../../database/Interfaces/LogInterface/ILog"

class LogsRoute {
    router: Router;
    private LoggingService: LoggingService;
    private Authentication: Authentication

    constructor() {
        this.router = Router();
        this.LoggingService = new LoggingService();
        this.Authentication = new Authentication();
        this.initRoutes()
    }

    async ListLogsRoute(req: Request, res: Response, next: NextFunction) {
        try {
            //Pagination Parameters for Logs List
            const totalCountOnLogsTable = await this.LoggingService.GetTableCount() // Send Front-End to Show on Pagination Bar;
            const perPage = 10; // How Many Items Per Page (Limit)
            const currentPage = await this.RequestQueryControl(req.query)
            const currentPageForQuery = currentPage - 1
            const totalpages = Math.round(totalCountOnLogsTable / perPage)

            const logs: ILogs = await this.LoggingService.ListAllLogsPagination(currentPageForQuery, perPage)

            //Preparing Log Datas for EJS Front-end
            const logsObj = Object.values(logs);
            const data = []
            const columns = Object.values(LogTable)
            const tablename = "Log Records"

            for (let item of logsObj) {
                //item["date"] = item["date"].toLocaleDateString()
                data.push(Object.values(item))
            }
            res.render('logtable', { columns, tablename, data, totalpages, currentPage })

        } catch (e) {
            next(new LogRouteError(e.message))
        }
    }

    async DeleteLogRoute(req: Request, res: Response, next: NextFunction) {
        try {
            const deleteLog: ILog["log_id"] = req.body.payload;

            const result = await this.LoggingService.DeleteLogByLogId(deleteLog)
            res.json({ success: result })
        }
        catch (e) {
            next(new LogRouteError(e.message))
        }
    }

    initRoutes() {
        this.router.use('/', [this.Authentication.checkAuthenticated])
        this.router.get('/list', this.ListLogsRoute.bind(this))
        this.router.delete('/delete', this.DeleteLogRoute.bind(this))
    }

    ////Helpers
    async RequestQueryControl(reqQuery): Promise<number> {
        let currentPage = 1
        if (typeof reqQuery.page !== "undefined") {
            currentPage = parseInt(reqQuery.page.toString())
        }
        return currentPage;
    }
}

export const LoggingRouter = new LogsRoute().router
