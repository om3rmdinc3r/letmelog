export interface IResponse {
    statusCode: number;
    ResponseData: {
        message: string;
        data: any;
    }
}