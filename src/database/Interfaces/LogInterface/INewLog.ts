export interface INewLog {
	owner_id: string;
	request_id: string;
	url: string;
	statusCode: number;
	method: string; // GET-POST-PUT-PATCH
	type: string; // HTTP - HTTPS
}
