export interface IChartData {
	total_request_count: number;

	first_request_date: string;
	first_request_time: string;

	last_request_date: string;
	last_request_time: string;

	owner: string;

	count_404: number;
	count_200: number;
}
