import { goto } from '$app/navigation';
import api from '$lib/api';
import jwtDecode from 'jwt-decode';

const PATH_KEY = 'galleryppl:path';
const TOKEN_KEY = 'galleryppl:token';

export interface Response {
	credential: string;
}

export interface UserInfo {
	sub: string;
	name: string;
	email: string;
	avatar: string;
}

export class AuthManager {
	authenticate(auth: Response): Promise<void> {
		this.setToken(auth.credential);
		return api.auth
			.login()
			.then(() => {
				const path = localStorage.getItem(PATH_KEY);
				localStorage.removeItem(PATH_KEY);
				if (path) {
					goto(path, { replaceState: true });
				} else {
					goto('/courses', { replaceState: true });
				}
				return Promise.resolve();
			})
			.catch(() => {
				this.setToken('');
				return Promise.reject();
			});
	}

	getToken(): string {
		return localStorage.getItem(TOKEN_KEY);
	}

	private setToken(token: string): void {
		localStorage.setItem(TOKEN_KEY, token);
	}

	getUserInfo(): UserInfo {
		return jwtDecode<UserInfo>(this.getToken());
	}

	isAuthenticated(): boolean {
		return !!this.getToken();
	}

	reauthenticate(): void {
		localStorage.setItem(PATH_KEY, window.location.href);
		this.deauthenticate();
	}

	deauthenticate(): void {
		this.setToken('');
		goto('/', { replaceState: true });
	}
}

export const auth = new AuthManager();

export const requireAuth = (path?: string): void => {
	if (!auth.isAuthenticated()) {
		goto(path || '/', { replaceState: true });
	}
};
