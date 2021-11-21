import { get, writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { browser } from '$app/env';
import type { AggregatedVoteQuota } from './dtos';
import { CourseType } from './constant';

export const persistentStore = (key: string, initValue: string): Writable<string> => {
	const store = writable(initValue);
	if (!browser) return store;

	const storedValueStr = localStorage.getItem(key);
	if (storedValueStr !== null) store.set(storedValueStr);

	store.subscribe((val) => {
		if ([null, undefined].includes(val)) {
			localStorage.removeItem(key);
		} else {
			localStorage.setItem(key, val);
		}
	});

	window.addEventListener('storage', () => {
		const storedValueStr = localStorage.getItem(key);
		if (storedValueStr !== null && storedValueStr !== get(store)) store.set(storedValueStr);
	});

	return store;
};

export const aggregatedVoteQuota: Writable<AggregatedVoteQuota> = writable({
	[CourseType.PPL]: {
		blogs: 0,
		projects: 0
	},
	[CourseType.Propensi]: {
		blogs: 0,
		projects: 0
	}
});

export const currentCourseType: Writable<CourseType> = writable(CourseType.PPL);
