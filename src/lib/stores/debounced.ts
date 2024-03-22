import { derived, type Readable } from 'svelte/store';

export function debounced<Store extends Readable<any>>(delay: number, store: Store): Store {
	let timerId: ReturnType<typeof setTimeout>;

	let initial = true;

	const { subscribe } = derived(store, (value, set) => {
		if (initial) {
			set(value);
			initial = false;
			return;
		}

		clearTimeout(timerId);
		timerId = setTimeout(() => {
			set(value);
		}, delay);
	});

	return {
		...store,
		subscribe
	};
}
