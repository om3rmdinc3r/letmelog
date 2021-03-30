import { Knex } from "knex";
import * as config from "../../../config/env"
import * as uniqid from "uniqid"

import BaseRepository from '../BaseRepository';

import { LogTable } from "../../Enums/LogTable.enum"
import { ILog } from "../../Interfaces/LogInterface/ILog"
import { ILogs } from "../../Interfaces/LogInterface/ILogs"
import DatabaseError from "../../../exceptions/CustomErrors/DatabaseError/DatabaseError";
import { INewLog } from "../../Interfaces/LogInterface/INewLog";
import { IAddLog } from "../../Interfaces/LogInterface/IAddLog";
import { textChangeRangeIsUnchanged } from "typescript";
import { time } from "uniqid";


export default class LoggingRepository extends BaseRepository {

    private table: string;
    private tableColumns;

    constructor() {
        super();
        this.table = config.default.log_table;
        this.tableColumns = {
            log_id: LogTable.log_id,
            owner_id: LogTable.owner_id,
            url: LogTable.url,
            req_date: LogTable.req_date,
            req_time: LogTable.req_time,
            statusCode: LogTable.statusCode,
            method: LogTable.method,
            type: LogTable.type
        }
    }

    async AddNewLog(newLog: INewLog): Promise<boolean> {
        const trx: Knex.Transaction = await this.connector.transaction();
        try {
            const log: IAddLog = {
                log_id: uniqid('log-'),
                owner_id: newLog.owner_id,
                url: newLog.url,
                statusCode: newLog.statusCode,
                method: newLog.method,
                type: newLog.type
            }
            const result = await trx(this.table).insert(log);
            trx.commit();
            return Boolean(result);

        } catch (e) {
            trx.rollback();
            await this.ThrowDatabaseError(e.message)
        }
    }
    //Raw Query
    async ListAllLogsPagination(offset = 0, limit = 10, orderbyParam = this.tableColumns.req_date): Promise<ILogs> {
        try {
            const logs =
                await this.connector(this.table)
                    .select(
                        this.connector.raw
                            (`:log_id: ,:owner_id: , :url: , TO_CHAR(:req_date:\::DATE , 'dd/mm/yyyy') as :req_date: , :req_time: , :statusCode: , :method: , :type:`,
                                this.tableColumns))
                    .limit(limit).
                    orderBy(orderbyParam).
                    offset(limit * offset);
            return logs
        } catch (e) {
            throw new DatabaseError(e.message);
        }
    }

    async ListAllLogs(): Promise<ILogs> {
        try {
            const logs: ILogs = await this.connector(this.table).select();
            return logs
        } catch (e) {
            throw new DatabaseError(e.message);
        }
    }

    async ListByUrl(url: ILog["url"], offset = 0, limit = 25, orderbyParam = this.tableColumns.log_id): Promise<ILogs> {
        try {
            const logs =
                await this.connector(this.table)
                    .select().where(this.tableColumns.url, '=', url)
                    .limit(limit).
                    orderBy(orderbyParam).
                    offset(limit * offset);
            return logs
        } catch (e) {
            throw new DatabaseError(e.message);
        }
    }

    async DeleteLog(options): Promise<boolean> {
        const trx: Knex.Transaction = await this.connector.transaction();
        try {
            const result = await trx(this.table).delete().where(options)
            trx.commit()
            return Boolean(result)

        } catch (e) {
            trx.rollback()
            throw new DatabaseError(e.message)
        }
    }
    ///Deleting Scenarios
    async DeleteLogByLogId(id: ILog["log_id"]): Promise<boolean> {
        const trx: Knex.Transaction = await this.connector.transaction();
        try {
            const result = await trx(this.table).delete().where({ log_id: id })
            trx.commit();
            return Boolean(result)
        } catch (e) {
            trx.rollback();
            await this.ThrowDatabaseError(e.message)
        }
    }

    async DeleteLogsByUserId(owner_id: ILog["owner_id"]): Promise<boolean> {
        const trx: Knex.Transaction = await this.connector.transaction();
        try {
            const result = await trx(this.table).delete().where({ owner_id: owner_id })
            trx.commit();
            return Boolean(result)
        } catch (e) {
            trx.rollback();
            await this.ThrowDatabaseError(e.message)
        }
    }

    async DeleteLogsByUrl(url: ILog["url"]): Promise<boolean> {
        const trx: Knex.Transaction = await this.connector.transaction();
        try {
            const result = await trx(this.table).delete().where({ url: url })
            trx.commit();
            return Boolean(result)
        } catch (e) {
            trx.rollback();
            await this.ThrowDatabaseError(e.message)
        }
    }

    //Raw Queries
    async DeleteLogsByLoggingDate(date: ILog["req_date"]): Promise<boolean> {
        const trx: Knex.Transaction = await this.connector.transaction();
        try {
            //const result = await trx(this.table).delete().where(trx.raw(`TO_CHAR(:table_col: \::DATE  , 'dd/mm/yyyy') = ':date:'`, {table_col: LogTable.req_date,date: date}));

            const result = await trx(this.table).delete().where({ date: date })
            trx.commit();
            //console.log(trx(this.table).delete().whereRaw(`??::DATE = ?`, [LogTable.req_date, date]).toQuery())
            return Boolean(result)
        }
        catch (e) {
            trx.rollback();
            await this.ThrowDatabaseError(e.message)
        }
    }

    async DeleteLogsAfterDate(date: ILog["req_date"]): Promise<boolean> {
        const trx: Knex.Transaction = await this.connector.transaction();
        try {
            const result = await trx(this.table).delete().where(LogTable.req_date, '<', date);
            trx.commit();
            return Boolean(result)
        } catch (e) {
            trx.rollback();
            await this.ThrowDatabaseError(e.message)
        }
    }


    ///Worker ? 
    /**
     * 
     *
     * 
     * 
     */

    // Helpers
    async ThrowDatabaseError(message: string) {
        throw new DatabaseError(message)
    }
    async GetTableCount(): Promise<number> {
        try {
            const res = await this.connector(this.table).count()
            return parseInt(res[0].count.toString())
        } catch (e) {
            await this.ThrowDatabaseError(e.message)
        }
    }
}