export interface IError extends Error{
    statusCode : number;
    type ?: string;
}
