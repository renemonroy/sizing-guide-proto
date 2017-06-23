/**
 * Function used by debounce (below) that enforces to run a method
 * to be called again after certain amount of time.
 */
const debouncer = (fn, duration) => {
	let timeoutId;
	function wrapper(...args) {
		wrapper.clear();
		timeoutId = setTimeout(() => {
			timeoutId = null;
			fn.apply(this, args);
		}, duration);
	}
	wrapper.clear = function clear() {
		if (timeoutId) {
			clearTimeout(timeoutId);
			timeoutId = null;
		}
	};
	return wrapper;
};

/**
 * Debouncer is a decorator to allow functions be debounced by the
 * time passed in the argument. Defaults 300ms.
 */
export const debounce = function debounce(duration = 300) {
	return function debounceMethod(target, key, { enumerable, value }) {
		return {
			configurable: true,
			enumerable,
			get: function getter() {
				Object.defineProperty(this, key, {
					configurable: true,
					writable: true,
					enumerable,
					value: debouncer(value, duration),
				});
				return this[key];
			},
		};
	};
};
