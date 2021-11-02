import { get } from 'svelte/store';
import { auth } from './auth';
import type { APIResponse } from './dtos';

const BASE_URL = import.meta.env.VITE_BASE_URL || '';

const withAuth = (): HeadersInit => ({
	Authorization: `Bearer ${get(auth.getToken())}`
});

const handleResponse = (response: Response) => {
	if (!response.ok) {
		if (response.status === 401) {
			new auth.reauthenticate();
		}
		throw new Error(response.statusText);
	}
	return response.json();
};

const api = {
	auth: {
		login(): Promise<APIResponse<undefined>> {
			return fetch(`${BASE_URL}/api/v1/auth/login`, {
				method: 'POST',
				headers: {
					...withAuth()
				}
			}).then(handleResponse);
		},
		logout(): Promise<APIResponse<undefined>> {
			return fetch(`${BASE_URL}/api/v1/auth/logout`, {
				method: 'POST',
				headers: {
					...withAuth()
				}
			}).then(handleResponse);
		}
	}
};

export default api;
