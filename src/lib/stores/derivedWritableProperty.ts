import type { Writable } from 'svelte/store';
import { derivedWritable } from './derivedWritable.js';

export function derivedWritableProperty<T extends Record<string, any>, Key extends keyof T>(
	store: Writable<T>,
	key: Key
): Writable<T[Key]> {
	return derivedWritable(store, {
		read(value) {
			return value[key];
		},
		write(value, other) {
			other[key] = value;
			return other;
		}
	});
}
