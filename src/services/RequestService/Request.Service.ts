import RequestRepository from '../../database/Repositories/RequestRepository/Request.Repository';
import RequestServiceError from '../../exceptions/CustomErrors/RequestErrors/RequestServiceErrors/RequestServiceError';

import { INewRequest } from '../../database/Interfaces/RequestInterface/INewRequest';
import { IRequest } from '../../database/Interfaces/RequestInterface/IRequest';
import { IRequests } from '../../database/Interfaces/RequestInterface/IRequests';
import { IUpdateRequest } from '../../database/Interfaces/RequestInterface/IUpdateRequest';

export default class RequestService {
	private RequestRepository: RequestRepository;

	constructor() {
		this.RequestRepository = new RequestRepository();
	}

	async GetRequestList(): Promise<IRequests> {
		try {
			const requests = await this.RequestRepository.GetRequestList();
			return requests;
		} catch (e) {
			throw new RequestServiceError(e.message, 'GetRequestList');
		}
	}
	async FindRequestById(id: IRequest['id']): Promise<IRequest> {
		try {
			const request = await this.RequestRepository.FindRequestById(id);
			return request;
		} catch (e) {
			throw new RequestServiceError(e.message, 'FindRequestById');
		}
	}
	async GetRequestByOwnerID(owner_id: IRequest['owner_id']): Promise<IRequests> {
		try {
			const requests: IRequests = await this.RequestRepository.GetRequestByOwnerID(owner_id);
			return requests;
		} catch (e) {
			throw new RequestServiceError(e.message, 'GetRequestByOwnerID');
		}
	}
	async AddNewRequest(newRequest: INewRequest): Promise<IRequest> {
		try {
			const result = await this.RequestRepository.AddNewRequest(newRequest);
			return result;
		} catch (e) {
			throw new RequestServiceError(e.message, 'AddNewRequest');
		}
	}
	async DeleteRequestById(id: IRequest['id']): Promise<boolean> {
		try {
			const result = await this.RequestRepository.DeleteRequestById(id);
			return result;
		} catch (e) {
			throw new RequestServiceError(e.message, 'DeleteRequestById');
		}
	}
	async DeleteRequestByUserId(owner_id: IRequest['owner_id']): Promise<boolean> {
		try {
			const result = await this.RequestRepository.DeleteRequestByUserId(owner_id);
			return result;
		} catch (e) {
			throw new RequestServiceError(e.message, 'DeleteRequestByUserId');
		}
	}
	async UpdateRequestById(id: IRequest['id'], updateRequest: IUpdateRequest): Promise<IRequest> {
		try {
			const result = await this.RequestRepository.UpdateRequestById(id, updateRequest);
			return result;
		} catch (e) {
			throw new RequestServiceError(e.message, 'UpdateRequestById');
		}
	}

	//Helpers
	async ControlExistenceByID(id: IRequest['id']): Promise<boolean> {
		return await this.RequestRepository.ControlExistenceByID(id);
	}
}
