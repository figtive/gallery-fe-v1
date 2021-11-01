export type Color = 'primary' | 'secondary' | 'disabled' | 'info' | 'success' | 'warning' | 'error';

export const colorSet: { [key in Color]: string } = {
	primary: '#615CC1',
	secondary: '#FC94D8',
	disabled: '#A0A0A0',
	// TODO
	info: '#0070f3',
	success: '#0070f3',
	warning: '#f0f0f0',
	error: '#f0f0f0'
};
