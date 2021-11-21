import { get } from 'svelte/store';
import { auth } from './auth';
import type { BlogCategoryType, ProjectFieldType } from './constant';
import { CourseType } from './constant';
import type { AggregatedVoteQuota, APIResponse, Blog, Project } from './dtos';

const BASE_URL = import.meta.env.VITE_BASE_URL || '';

const withAuth = (token?: string): HeadersInit => ({
	Authorization: `Bearer ${token || get(auth.getToken())}`
});

const handleResponse = async <T>(response: Response): Promise<T> => {
	let jsonResponse: APIResponse<T>;
	try {
		jsonResponse = await response.json();
	} catch (e) {
		throw new Error(e);
	}
	if (!response.ok) {
		if (response.status === 401) {
			auth.deauthenticate();
			throw new Error('Token expired');
		}
		throw new Error(jsonResponse.error || response.statusText || response.status.toString());
	}
	return jsonResponse.data;
};

const api = {
	auth: {
		login(token: string): Promise<void> {
			return fetch(`${BASE_URL}/api/v1/auth/login`, {
				method: 'POST',
				headers: {
					...withAuth(token)
				}
			}).then((resp) => handleResponse<void>(resp));
		}
	},
	coursework: {
		project: {
			getOne(id: string): Promise<Project> {
				return fetch(`${BASE_URL}/api/v1/coursework/project/${id}`, {
					method: 'GET'
				}).then((resp) => handleResponse<Project>(resp));
			},
			getAll(query: string, course: CourseType, field: ProjectFieldType): Promise<Project[]> {
				return fetch(
					`${BASE_URL}/api/v1/coursework/project?${new URLSearchParams({ query, course, field })}`,
					{
						method: 'GET'
					}
				).then((resp) => handleResponse<Project[]>(resp));
			}
		},
		blog: {
			getOne(id: string): Promise<Blog> {
				return fetch(`${BASE_URL}/api/v1/coursework/blog/${id}`, {
					method: 'GET'
				}).then((resp) => handleResponse<Blog>(resp));
			},
			getAll(query: string, category: BlogCategoryType): Promise<Blog[]> {
				return fetch(
					`${BASE_URL}/api/v1/coursework/blog?${new URLSearchParams({ query, category })}`,
					{
						method: 'GET'
					}
				).then((resp) => handleResponse<Blog[]>(resp));
			}
		}
	},
	leaderboard: {
		getProject(course: CourseType): Promise<Project[]> {
			return fetch(`${BASE_URL}/api/v1/leaderboard/${course}/project`, {
				method: 'GET'
			}).then((resp) => handleResponse<Project[]>(resp));
		},
		getBlog(course: CourseType): Promise<Blog[]> {
			return fetch(`${BASE_URL}/api/v1/leaderboard/${course}/blog`, {
				method: 'GET'
			}).then((resp) => handleResponse<Blog[]>(resp));
		}
	},
	vote: {
		getQuota(): Promise<AggregatedVoteQuota> {
			return fetch(`${BASE_URL}/api/v1/vote/quota`, {
				method: 'GET',
				headers: {
					...withAuth()
				}
			})
				.then((resp) => handleResponse<AggregatedVoteQuota>(resp))
				.then((aggregatedVoteQuota) => {
					Object.values(CourseType).forEach((courseId) => {
						if (aggregatedVoteQuota[courseId] === undefined) {
							aggregatedVoteQuota[courseId] = {
								blogs: 0,
								projects: 0
							};
						}
					});
					return aggregatedVoteQuota;
				});
		},
		cast(id: string, vote: boolean): Promise<void> {
			return fetch(`${BASE_URL}/api/v1/vote/${id}`, {
				method: 'POST',
				body: JSON.stringify({ vote }),
				headers: {
					...withAuth()
				}
			}).then((resp) => handleResponse<void>(resp));
		},
		getStatus(id: string): Promise<boolean> {
			return fetch(`${BASE_URL}/api/v1/vote/${id}`, {
				method: 'GET',
				headers: {
					...withAuth()
				}
			}).then((resp) => handleResponse<boolean>(resp));
		}
	}
};

export default api;
