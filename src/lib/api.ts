import { get } from 'svelte/store';
import { auth } from './auth';
import type { APIResponse, Project } from './dtos';

const BASE_URL = import.meta.env.VITE_BASE_URL || '';

const withAuth = (token?: string): HeadersInit => ({
	Authorization: `Bearer ${token || get(auth.getToken())}`
});

const handleResponse = async <T>(response: Response) => {
	const jsonResponse: APIResponse<T> = await response.json();
	if (!response.ok) {
		if (response.status === 401) {
			auth.deauthenticate();
			throw new Error('Please sign in again');
		}
		throw new Error(jsonResponse.error);
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
			getAll(query: string, course: string, field: string): Promise<Project[]> {
				return fetch(
					`${BASE_URL}/api/v1/coursework/project?${new URLSearchParams({ query, course, field })}`,
					{
						method: 'GET'
					}
				).then((resp) => handleResponse<Project[]>(resp));
			}
		}
	}
};

export default api;
