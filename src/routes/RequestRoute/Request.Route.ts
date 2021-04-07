import { Request, Response, NextFunction, Router, request } from 'express';
import * as uniqid from 'uniqid';

import RequestService from '../../services/RequestService/Request.Service';
import RequestJoiSchema from '../../middlewares/JoiSchemas/RequestSchema/RequestJoiSchema';

import { RequestTable } from '../../database/Enums/RequestTable.enum';
import { IRequests } from '../../database/Interfaces/RequestInterface/IRequests';
import { IRequest } from '../../database/Interfaces/RequestInterface/IRequest';
import { IUpdateRequest } from '../../database/Interfaces/RequestInterface/IUpdateRequest';

import { LetMeLogWorker } from '../../Logger/LoggersController';

import * as RequestErrs from '../../exceptions/CustomErrors/RequestErrors/RequestRouteErrors';
import { INewRequest } from '../../database/Interfaces/RequestInterface/INewRequest';
import { IUser } from '../../database/Interfaces/UserInterface/IUser';

import Authentication from '../../middlewares/authentication.middleware';

class RequestRouteClass {
	router: Router;
	private RequestService: RequestService;
	private Authentication: Authentication;

	constructor() {
		this.router = Router();
		this.RequestService = new RequestService();
		this.Authentication = new Authentication();
		this.initRoutes();
	}

	async ListRequestsRoute(req: Request, res: Response, next: NextFunction) {
		try {
			let requests = await this.RequestService.GetRequestList();

			let reqObj = Object.values(requests);
			let requestArr = [];

			for (let item of reqObj) {
				requestArr.push(Object.values(item));
			}
			let data = requestArr;
			const columns = Object.values(RequestTable);
			const tablename = 'Requests';

			res.render('table', {
				columns,
				data,
				tablename
			});
		} catch (e) {
			next(e);
		}
	}
	async UpdateRequestRoute(req: Request, res: Response, next: NextFunction) {
		try {
			const updateRequest: IUpdateRequest = req.body;

			if (!(await this.RequestService.ControlExistenceByID(updateRequest.id))) {
				// Eğer verilen id ye sahip bir product yok ise
				next(new RequestErrs.errs.RequestNotFoundError('No Request Found'));
			} else {
				const result = await this.RequestService.UpdateRequestById(req.body.id, updateRequest);
				res.redirect('/request/list');
			}
		} catch (e) {
			next(new RequestErrs.errs.RequestRouteError(e.message));
		}
	}
	async DeleteRequestByIdRoute(req: Request, res: Response, next: NextFunction) {
		try {
			const deleteRequest: IRequest['id'] = req.body.payload;

			if (!(await this.RequestService.ControlExistenceByID(deleteRequest))) {
				// Eğer verilen id ye sahip bir request yok ise
				next(new RequestErrs.errs.RequestNotFoundError('No Request Found'));
			}
			const result = await this.RequestService.DeleteRequestById(deleteRequest);
			await LetMeLogWorker.DeleteRequest(deleteRequest);

			res.json({
				success: result
			});
		} catch (e) {
			next(new RequestErrs.errs.RequestRouteError(e.message));
		}
	}
	async AddNewRequestRoute(req: Request, res: Response, next: NextFunction) {
		try {
			const _request = req.body;
			const _user = req.user;
			const id = uniqid('request-');

			const newRequest: INewRequest = {
				id: id,
				owner_id: _user['id'],
				url: _request.url,
				period: _request.period,
				method: 'GET',
				type: 'HTTPS'
			};
			const result = await this.RequestService.AddNewRequest(newRequest);
			await LetMeLogWorker.AddNewRequest(newRequest);
			res.redirect('/main');
		} catch (e) {
			next(new RequestErrs.errs.RequestRouteError(e.message));
		}
	}

	initRoutes() {
		this.router.use('/', [this.Authentication.checkAuthenticated]);
		this.router.get('/list', this.ListRequestsRoute.bind(this));
		this.router.get('/add', (req: Request, res: Response) => {
			res.render('addrequest');
		});
		this.router.post('/add', this.AddNewRequestRoute.bind(this));
		this.router.delete('/delete', this.DeleteRequestByIdRoute.bind(this));
		this.router.patch('/update', this.UpdateRequestRoute.bind(this));
	}
}
export const RequestRouter = new RequestRouteClass().router;
