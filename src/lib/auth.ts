import { derived, get } from 'svelte/store';
import type { Readable, Writable } from 'svelte/store';
import { goto } from '$app/navigation';
import api from '$lib/api';
import jwtDecode from 'jwt-decode';
import { persistentStore } from './store';
import { browser } from '$app/env';

const PATH_KEY = 'gallery:path';
const TOKEN_KEY = 'gallery:token';

export interface Response {
	credential: string;
}

export interface UserInfo {
	sub: string;
	name: string;
	given_name: string;
	family_name: string;
	email: string;
	avatar: string;
}
class AuthManager {
	private token: Writable<string>;
	private authState: Readable<boolean>;

	constructor() {
		this.token = persistentStore(TOKEN_KEY, undefined);
		this.authState = derived(this.token, (token) => !!token);
	}

	authenticate(auth: Response, redirect?: string): Promise<void> {
		return api.auth
			.login(auth.credential)
			.then(() => {
				this.token.set(auth.credential);
				const prevPath = localStorage.getItem(PATH_KEY);
				localStorage.removeItem(PATH_KEY);
				if (prevPath || redirect) goto(prevPath || redirect, { replaceState: true });
				return Promise.resolve();
			})
			.catch((e) => {
				this.token.set(undefined);
				return Promise.reject(e);
			});
	}

	getToken(): Readable<string> {
		return this.token;
	}

	getUserInfo(): UserInfo {
		const token = get(this.token);
		return token
			? jwtDecode<UserInfo>(token)
			: {
					sub: '',
					name: '',
					given_name: '',
					family_name: '',
					email: '',
					avatar: ''
			  };
	}

	isAuthenticated(): Readable<boolean> {
		return this.authState;
	}

	reauthenticate(): void {
		localStorage.setItem(PATH_KEY, window.location.href);
		this.deauthenticate();
	}

	deauthenticate(): void {
		this.token.set(undefined);
	}
}

export const auth = new AuthManager();

export const requireAuth = (path?: string): void => {
	if (browser && !get(auth.isAuthenticated())) {
		goto(path || '/', { replaceState: true });
	}
};
