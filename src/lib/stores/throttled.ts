import { derived, type Readable } from 'svelte/store';

export function debounced<Store extends Readable<any>>(delay: number, store: Store): Store {
	let initial = true;
	let timerId: ReturnType<typeof setTimeout> | null = null;
	let newValue: any;

	const { subscribe } = derived(store, (value, set) => {
		if (initial) {
			set(value);
			initial = false;
			return;
		}

		newValue = value;

		if (!timerId) {
			timerId = setTimeout(() => {
				timerId = null;
				set(newValue);
			}, delay);
		}
	});

	return {
		...store,
		subscribe
	};
}
