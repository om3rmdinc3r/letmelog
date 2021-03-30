import { Knex } from "knex"
import * as config from "../../../config/env"
import * as uniqid from "uniqid"

import { IRequest } from "../../Interfaces/RequestInterface/IRequest"
import { INewRequest } from "../../Interfaces/RequestInterface/INewRequest"
import { IRequests } from "../../Interfaces/RequestInterface/IRequests"


import BaseRepository from "../BaseRepository"
import { RequestTable } from "../../Enums/RequestTable.enum"

import DatabaseError from "../../../exceptions/CustomErrors/DatabaseError/DatabaseError";
import { IUpdateRequest } from "../../Interfaces/RequestInterface/IUpdateRequest"


export default class RequestRepository extends BaseRepository {

    private table: string;
    private tableColums: any;
    constructor() {
        super()
        this.table = config.default.req_table;
        this.tableColums = {
            id: RequestTable.id,
            owner_id: RequestTable.owner_id,
            name: RequestTable.id,
            url: RequestTable.url,
            period: RequestTable.period,
            method: RequestTable.method
        }
    }

    /**Gets All Requests From Request Table
     * 
     * @returns IRequests
     */
    async GetRequestList(): Promise<IRequests> {
        try {
            const reqs: IRequests = await this.connector(this.table).select()
            return reqs
        }
        catch (e) {
            await this.ThrowDatabaseError(e.message)
        }
    }
    /** finds request by request id
     * 
     * @param id -> The id of request
     * @returns IRequest
     */
    async FindRequestById(id: IRequest["id"]): Promise<IRequest> {
        try {
            const request = await this.connector(this.table).select().where({ id: id }).first();
            return request;
        }
        catch (e) {
            await this.ThrowDatabaseError(e.message)
        }
    }
    /** Finds Requests by owner_id
     * 
     * @param owner_id 
     * @returns IRequests
     */
    async GetRequestByOwnerID(owner_id: IRequest["owner_id"]): Promise<IRequests> {
        try {
            const requests = await this.connector(this.table).where(RequestTable.owner_id, "=", owner_id)
            return requests;
        } catch (e) {
            await this.ThrowDatabaseError(e.message)
        }
    }
    /** Adds new request
     * 
     * @param newRequest INewRequest
     * @returns IRequest
     */
    async AddNewRequest(newRequest: INewRequest): Promise<IRequest> {
        const trx: Knex.Transaction = await this.connector.transaction()
        try {

            await trx(this.table).insert(newRequest)
            trx.commit()
            const result = await this.FindRequestById(newRequest.id);
            return result;
        }
        catch (e) {
            trx.rollback()
            await this.ThrowDatabaseError(e.message)
        }
    }
    /** Deletes request
     * 
     * @param id 
     * @returns boolean
     */
    async DeleteRequestById(id: IRequest["id"]): Promise<boolean> {
        const trx: Knex.Transaction = await this.connector.transaction();
        try {
            const result = await trx(this.table).where({ id: id }).del()
            await trx.commit();
            return Boolean(result);
        }
        catch (e) {
            await trx.rollback();
            await this.ThrowDatabaseError(e.message)
        }
    }
    async DeleteRequestByUserId(owner_id: IRequest["owner_id"]): Promise<boolean> { // maybe number ?
        const trx: Knex.Transaction = await this.connector.transaction();
        try {
            const result = await trx(this.table).where({ owner_id: owner_id }).del()
            await trx.commit();
            return Boolean(result);
        }
        catch (e) {
            await trx.rollback();
            await this.ThrowDatabaseError(e.message)
        }
    }
    /**Updates request by given id
     * 
     * @param id 
     * @param updateRequest 
     * @returns IRequest
     */
    async UpdateRequestById(id: IRequest["id"], updateRequest: IUpdateRequest): Promise<IRequest> {
        const trx: Knex.Transaction = await this.connector.transaction();
        try {
            const res = await trx(this.table).where({ id: id }).update(updateRequest)
            await trx.commit(res);
            const req = await this.FindRequestById(id)
            return req

        } catch (e) {
            await this.ThrowDatabaseError(e.message)
        }
    }


    //////Helpers
    async ThrowDatabaseError(message: string) {
        throw new DatabaseError(message)
    }
    async ControlExistenceByID(id: IRequest["id"]) {
        return Boolean(await this.connector(this.table).select().where({ 'id': id }).first());
    }

}