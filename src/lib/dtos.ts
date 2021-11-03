import type { BlogCategoryType, CourseType, ProjectFieldType } from '$lib/constant';

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
	course: CourseType;
	field: ProjectFieldType;
	metadata?: string; // stringified JSON of ProjectMetadata
	createdAt: string;
}

export interface ProjectMetadata {
	partner: string;
	productOwner: string[];
	scrumMaster: string[];
	developmentTeam: string[];
}

export interface Blog {
	id: string;
	title: string;
	author: string;
	category: BlogCategoryType;
	createdAt: string;
}
