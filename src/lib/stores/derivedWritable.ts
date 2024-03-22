import { derived, get, type Updater, type Writable } from 'svelte/store';

export function derivedWritable<In, Out>(
	store: Writable<In>,
	options: {
		read: (value: In) => Out;
		write: (value: Out, other: In) => In;
	}
): Writable<Out> {
	const { subscribe } = derived(store, options.read);

	const set = (value: Out) => {
		store.set(options.write(value, get(store)));
	};
	const update = (updater: Updater<Out>) => {
		set(updater(get({ subscribe })));
	};

	return {
		subscribe,
		set,
		update
	};
}
