/**
 * Builds a class name for DOM elements. It always return a string
 * no matter the type of inputs.
 */
const hasOwn = {}.hasOwnProperty;
const className = (...args) => {
	const classes = [];
	const argsSize = args.length;
	for (let i = 0; i < argsSize; i += 1) {
		const arg = args[i];
		if (arg) {
			const argType = typeof arg;
			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(className(...arg));
			} else if (argType === 'object') {
				Object.keys(arg).forEach((key) => {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				});
			}
		}
	}
	return classes.join(' ');
};

export default className;
