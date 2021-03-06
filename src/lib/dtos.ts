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
	thumbnail: string[];
	link: string;
	video: string;
	active: boolean;
	courseId: CourseType;
	field: ProjectFieldType;
	metadata?: string; // stringified JSON of ProjectMetadata
	createdAt: string;
}

export interface ProjectMetadata {
	partner: string;
	productOwner: string;
	scrumMaster: string;
	devOps: string;
	developmentTeam: string[];
}

export interface Blog {
	id: string;
	title: string;
	author: string;
	link: string;
	courseId: CourseType;
	category: BlogCategoryType;
	createdAt: string;
}

export interface VoteQuota {
	blogs: number;
	projects: number;
}

export type AggregatedVoteQuota = Record<CourseType, VoteQuota>;
