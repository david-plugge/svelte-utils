import { get, type Updater, type Writable } from 'svelte/store';

export function debouncedWritable<T>(delay: number, store: Writable<T>): Writable<T> {
	let timerId: ReturnType<typeof setTimeout>;

	function set(value: T) {
		clearTimeout(timerId);
		timerId = setTimeout(() => {
			store.set(value);
		}, delay);
	}

	function update(updater: Updater<T>) {
		set(updater(get(store)));
	}

	return {
		...store,
		set,
		update
	};
}
