export interface ILog {
	log_id: string; // unique log id - Create Repo
	owner_id: string; // foreign key from request list table
	url: string; // google.com - facebook.com etc

	req_id: string;
	req_date: string; // 21.03.2021 etc - Create Repo
	req_time: string; // 15:30 etc - Create Repo

	statusCode: number; // 200 - 201 - 404 etc
	method: string; // GET-POST-PUT-PATCH
	type: string; // HTTP - HTTPS
}
