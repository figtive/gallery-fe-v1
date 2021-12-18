export const shuffle = <T>(arr: T[]): T[] => {
	let i = 0;
	while (i < arr.length) {
		const j = i + Math.floor(Math.random() * (arr.length - i));
		[arr[i], arr[j]] = [arr[j], arr[i]];
		i++;
	}
	return arr;
};
