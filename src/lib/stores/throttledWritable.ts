import { get, type Updater, type Writable } from 'svelte/store';

export function throttledWritable<T>(delay: number, store: Writable<T>): Writable<T> {
	let timerId: ReturnType<typeof setTimeout> | null = null;
	let newValue: T;

	function set(value: T) {
		newValue = value;

		if (!timerId) {
			set(newValue);

			timerId = setTimeout(() => {
				timerId = null;
				set(newValue);
			}, delay);
		}
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
