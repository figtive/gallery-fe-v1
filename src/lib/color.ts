export type Color = 'primary' | 'secondary' | 'disabled' | 'info' | 'success' | 'warning' | 'error';

export const colorSet: { [key in Color]: string } = {
	primary: '#615CC1',
	secondary: '#CF66AA',
	disabled: '#AAAAAA',
	success: '#1FA835',
	info: '#266DD9',
	warning: '#E5B812',
	error: '#BC1836'
};
