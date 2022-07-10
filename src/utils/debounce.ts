import { browser } from '$app/env';

export interface Debouncer<T> {
	timer?: number;
	(val: T, cb: (val: T) => unknown): void;
}

/**
 * Debounces calls to this function.
 *
 * **Warning:** This code needs access to the `window` object, and thus only runs
 * in the browser.
 *
 * If multiple calls to this function occur, the callback will only be called once
 * the debouncer hasn't been calling within the specified delay.
 * The callback will only be called once (most recent version of the callback).
 *
 * @param delay how long to wait before invoking the callback.
 */
export function debounce<T>(delay: number): Debouncer<T> {
	const debouncer = (val: T, cb: (val: T) => unknown) => {
		if (browser) {
			window.clearTimeout(debouncer.timer);
			debouncer.timer = window.setTimeout(() => cb(val), delay);
		}
	};
	debouncer.timer = undefined as number | undefined;

	return debouncer;
}
