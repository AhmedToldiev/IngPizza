export function loadState<T>(key: string): T | undefined {
	try {
		const jsonState = localStorage.getItem(key);
		if (!jsonState) {
			return undefined;
		}
		return JSON.parse(jsonState);
	} catch (error) {
		console.error(error);
		return undefined;
	}
}

export function saveState<T>(key: string, state: T) {
	const stringState = JSON.stringify(state);
	localStorage.setItem(key, stringState);
}
