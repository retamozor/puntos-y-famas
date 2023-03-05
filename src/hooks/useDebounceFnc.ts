import React from 'react';

function useDebounceFnc<T = any>(funcion: (...args: any[]) => T | Promise<T>, delay: number) {
	const [timer, setTimer] = React.useState(setTimeout(() => {}, 0));

	const debouncedFnc = React.useCallback(
		(...args: any[]) => {
			clearTimeout(timer);
			return new Promise<T>((resolve, reject) => {
				const timeout = setTimeout(async () => {
					try {
						const res = await funcion(...args);
						resolve(res);
					} catch (error) {
						reject(error);
					}
				}, delay);
				setTimer(timeout);
			});
		},
		[funcion, delay, timer]
	);

	return debouncedFnc;
};

export default useDebounceFnc;