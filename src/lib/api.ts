import { get } from 'svelte/store';
import { auth } from './auth';
import type { BlogCategoryType, CourseType, ProjectFieldType } from './constant';
import type { APIResponse, Blog, Project } from './dtos';

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
			throw new Error('Please sign in again');
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
	}
};

export default api;
