import type { BlogCategoryType, ProjectFieldType } from '$lib/constant';

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
	field: ProjectFieldType;
	createdAt: string;
}

export interface Blog {
	id: string;
	title: string;
	author: string;
	category: BlogCategoryType;
	createdAt: string;
}
