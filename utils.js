// Will place any utility code functions in this file.

const debounce = (func, delay = 1000) => {
	let timeoutId;
	return (...args) => {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		// add a setTimeout to debounce an input -  waiting some time
		// to pass after the last event to actually do something.
		timeoutId = setTimeout(() => {
			func.apply(null, args);
		}, delay);
	};
};
