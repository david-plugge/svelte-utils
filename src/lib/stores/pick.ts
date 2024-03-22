import { derived, type Readable } from 'svelte/store';

export function pick<T extends Record<string, any>, K extends keyof T>(
	store: Readable<T>,
	key: K | K[]
): Readable<Pick<T, K>> {
	const keys = Array.isArray(key) ? key : [key];

	return derived(store, (value, set) => {
		const data = {} as Pick<T, K>;

		for (const key of keys) {
			data[key] = value[key];
		}

		set(data);
	});
}
