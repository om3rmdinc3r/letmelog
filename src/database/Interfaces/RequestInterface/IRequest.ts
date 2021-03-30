
export interface IRequest {

    id: string; // represents url
    owner_id: string; // user id that added request
    //name: string; // not necessary , default equals url , can be like "admin's request" or my service
    url: string; // google.com - facebook.com etc
    period: number // as minute (5 means 5 minute -> 300 sec)
    method: string; // GET-POST-PUT
    type: string; // HTTP - HTTPS

}