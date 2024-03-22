import type { Writable } from 'svelte/store';

export function storage<T>(store: Writable<T>, key: string) {
	function set(value: T) {}

	return {
		...store
	};
}
