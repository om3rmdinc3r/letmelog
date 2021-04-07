import { Request, Response, NextFunction, Router, request } from 'express';
import LoggingService from '../../services/LogService/Log.Service';

import { LogTable } from '../../database/Enums/LogTable.enum';
import Authentication from '../../middlewares/authentication.middleware';

import LogRouteError from '../../exceptions/CustomErrors/LogErrors/LogRouteError/LogRouteError';
import { ILogs } from '../../database/Interfaces/LogInterface/ILogs';
import { ILog } from '../../database/Interfaces/LogInterface/ILog';
import { IRequest } from '../../database/Interfaces/RequestInterface/IRequest';
import { IChartData } from '../../Helpers/ChartDataHelper/IChartData';
import UserService from '../../services/UserService/User.Service';

class LogsRoute {
	router: Router;
	private LoggingService: LoggingService;
	private UserService: UserService;
	private Authentication: Authentication;

	constructor() {
		this.router = Router();
		this.LoggingService = new LoggingService();
		this.UserService = new UserService();
		this.Authentication = new Authentication();
		this.initRoutes();
	}

	async ListLogsRoute(req: Request, res: Response, next: NextFunction) {
		try {
			//Pagination Parameters for Logs List
			const totalCountOnLogsTable = await this.LoggingService.GetTableCount(); // Send Front-End to Show on Pagination Bar;
			const perPage = 10; // How Many Items Per Page (Limit)

			const currentPage = await this.RequestQueryControl(req.query);

			const currentPageForQuery = currentPage - 1;
			const totalpages = Math.round(totalCountOnLogsTable / perPage);

			const logs: ILogs = await this.LoggingService.ListAllLogsPagination(currentPageForQuery, perPage);

			//Preparing Log Datas for EJS Front-end
			const logsObj = Object.values(logs);
			const data = [];
			const columns = Object.values(LogTable);
			const tablename = 'Log Records';

			for (let item of logsObj) {
				data.push(Object.values(item));
			}
			res.render('logtable', { columns, tablename, data, totalpages, currentPage });
		} catch (e) {
			next(new LogRouteError(e.message));
		}
	}
	async DeleteLogRoute(req: Request, res: Response, next: NextFunction) {
		try {
			const deleteLog: ILog['log_id'] = req.body.payload;

			const result = await this.LoggingService.DeleteLogByLogId(deleteLog);
			res.json({ success: result });
		} catch (e) {
			next(new LogRouteError(e.message));
		}
	}
	async StatisticsRoute(req: Request, res: Response, next: NextFunction) {
		try {
			const req_id: IRequest['id'] = req.query.req_id.toString();
			const TLC = await this.LoggingService.GetLogCountByRequestId(req_id);

			const FLD = await this.LoggingService.FirstLogDate(req_id);
			const FLT = await this.LoggingService.FirstLogTime(req_id);

			const LLD = await this.LoggingService.LastLogDate(req_id);
			const LLT = await this.LoggingService.LastLogTime(req_id);

			const success = await this.LoggingService.GetStatusCodeCountByRequestID(req_id, 200);
			const failed = await this.LoggingService.GetStatusCodeCountByRequestID(req_id, 404);

			const owner_id = await this.LoggingService.GetOwnerIDByRequest(req_id);
			const owner = await this.UserService.FindUserById(owner_id);

			const chartData: IChartData = {
				total_request_count: TLC,

				first_request_date: FLD,
				first_request_time: FLT,

				last_request_date: LLD,
				last_request_time: LLT,

				count_200: success,
				count_404: failed,

				owner: owner['username']
			};

			res.render('chart', { data: chartData });
		} catch (e) {
			next(new LogRouteError(e.message));
		}
	}

	initRoutes() {
		this.router.use('/', [this.Authentication.checkAuthenticated]);
		this.router.get('/list', this.ListLogsRoute.bind(this));
		this.router.delete('/delete', this.DeleteLogRoute.bind(this));
		this.router.get('/statistics', this.StatisticsRoute.bind(this));
	}

	////Helpers
	async RequestQueryControl(reqQuery): Promise<number> {
		let currentPage = 1;
		if (typeof reqQuery.page !== 'undefined') {
			currentPage = parseInt(reqQuery.page.toString());
		}
		return currentPage;
	}
}

export const LoggingRouter = new LogsRoute().router;
