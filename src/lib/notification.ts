import { derived, writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { Color } from './color';
import { page } from '$app/stores';

const DEFAULT_TIMEOUT = 5000;

export interface Notification {
	key?: number;
	message: string;
	type: Color;
	autoClose?: boolean;
}

const notifications: Writable<Record<number, Notification>> = writable({});

export const notificationItems = derived(notifications, ($notifications) =>
	Object.values($notifications).sort((a, b) => a.key - b.key)
);

export const notify = (notification: Notification): number => {
	notification.key = new Date().getTime();
	notifications.update((prev) => {
		prev[notification.key] = notification;
		return prev;
	});
	if (notification.autoClose === undefined || notification.autoClose) {
		setTimeout(() => {
			unNotify(notification.key);
		}, DEFAULT_TIMEOUT);
	}
	return notification.key;
};

export const unNotify = (key: number): void => {
	notifications.update((prev) => {
		delete prev[key];
		return prev;
	});
};
