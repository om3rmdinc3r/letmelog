
export interface INewRequest {

    id: string; // represents url
    owner_id: string; // user id that added request
    url: string; // google.com - facebook.com etc
    period: number // as minute (5 means 5 minute -> 300 sec) 
    method: string;
    type: string;
}