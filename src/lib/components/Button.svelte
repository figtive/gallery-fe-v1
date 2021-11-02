<script lang="ts">
	import { Color, colorSet } from '$lib/color';

	export let type: string = '';
	export let onClick: () => void = () => {};
	export let className: string = '';
	export let color: Color = 'primary';
</script>

<button {type} on:click={onClick} class={className} style="--color: {colorSet[color]}">
	<slot />
</button>

<style lang="css">
	button {
		color: white;
		height: fit-content;
		border: 0px solid transparent;
		border-radius: 120px;
		cursor: pointer;
		padding: 0 1.5rem;
		height: 40px;
		font-family: 'Open Sans', sans-serif;
		font-weight: 600;
		background: var(--color);
		transition: 100ms;
	}

	button:hover,
	button:focus {
		filter: brightness(0.9);
	}

	button:active {
		filter: brightness(0.8);
	}
</style>
