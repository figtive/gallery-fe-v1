export interface APIResponse<T> {
	code: number;
	data: T;
	error: string;
}

export interface Project {
	id: string;
	name: string;
	team: string;
	description: string;
	thumbnail: string;
	active: boolean;
	field: string;
	createdAt: number;
}

export interface Blog {
	id: string;
	title: string;
	createdAt: number;
}
