import { ILog } from "../../database/Interfaces/LogInterface/ILog"
import { ILogs } from "../../database/Interfaces/LogInterface/ILogs"
import { INewLog } from "../../database/Interfaces/LogInterface/INewLog"
import LoggingRepository from "../../database/Repositories/LogRepository/Log.Repository"
import LogServiceError from "../../exceptions/CustomErrors/LogErrors/LogServiceError/LogServiceError"



export default class LoggingService {
    private LogRepository: LoggingRepository

    constructor() {
        this.LogRepository = new LoggingRepository()
    }

    async AddNewLog(newLog: INewLog): Promise<boolean> {
        try {
            const result = await this.LogRepository.AddNewLog(newLog)
            return result
        } catch (e) {
            throw new LogServiceError(e.message, "AddNewLog")
        }
    }
    async ListAllLogs(): Promise<ILogs> {
        try {
            const logs = await this.LogRepository.ListAllLogs()
            return logs
        } catch (e) {
            throw new LogServiceError(e.message, "ListAllLogs")
        }
    }

    async ListAllLogsPagination(offset: number, limit: number,): Promise<ILogs> {
        try {
            const logs = await this.LogRepository.ListAllLogsPagination(offset, limit)
            return logs
        } catch (e) {
            throw new LogServiceError(e.message, "ListAllLogs")
        }
    }
    async ListByUrl(url: ILog["url"], offset, limit, orderbyParam): Promise<ILogs> {
        try {
            const logs = await this.LogRepository.ListByUrl(url, offset, limit, orderbyParam)
            return logs
        } catch (e) {
            throw new LogServiceError(e.message, "ListAllLogs")
        }
    }
    async DeleteLogByLogId(id: ILog["log_id"]): Promise<boolean> {
        try {
            const result = await this.LogRepository.DeleteLogByLogId(id);
            return result
        } catch (e) {
            throw new LogServiceError(e.message, "DeleteLogById")
        }
    }
    async DeleteLogsByUserId(owner_id: ILog["owner_id"]): Promise<boolean> {
        try {
            const result = await this.LogRepository.DeleteLogsByUserId(owner_id)
            return result
        } catch (e) {
            throw new LogServiceError(e.message, "DeleteLogByUserId")
        }
    }
    async DeleteLogsByUrl(url: ILog["url"]): Promise<boolean> {
        try {
            const result = await this.LogRepository.DeleteLogsByUrl(url);
            return result
        } catch (e) {
            throw new LogServiceError(e.message, "DeleteLogsByUrl")
        }
    }
    //Raw Queries (See LoggingRepositoryClass)
    async DeleteLogsByLoggingDate(date: ILog["req_date"]): Promise<boolean> {
        try {
            const result = await this.LogRepository.DeleteLogsByUrl(date);
            return result
        } catch (e) {
            throw new LogServiceError(e.message, "DeleteLogsByLoggingDate")
        }
    }
    async DeleteLogsAfterDate(date: ILog["req_date"]): Promise<boolean> {
        try {
            const result = await this.LogRepository.DeleteLogsByUrl(date);
            return result;
        } catch (e) {
            throw new LogServiceError(e.message, "DeleteLogsAfterDate")
        }
    }

    //Helpers
    async GetTableCount(): Promise<number> {
        try {
            const count = await this.LogRepository.GetTableCount();
            return count;
        } catch (e) {
            throw new LogServiceError(e.message, "GetTableCount")
        }
    }
}