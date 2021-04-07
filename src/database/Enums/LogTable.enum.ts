export enum LogTable {
	log_id = 'log_id',
	owner_id = 'owner_id', // FK from RequestListTable
	req_id = 'request_id',
	url = 'url',
	req_time = 'time',
	req_date = 'date',
	statusCode = 'statusCode',
	method = 'method',
	type = 'type' // HTTP or HTTPS
}
