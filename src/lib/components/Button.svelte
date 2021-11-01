<script lang="ts">
	import { Color, colorSet } from '$lib/color';

	export let onClick: () => void = () => {};
	export let className: string = '';
	export let color: Color = 'primary';
</script>

<button on:click={onClick} class={className} style="--color: {colorSet[color]}">
	<slot />
</button>

<style lang="css">
	button {
		color: white;
		border: 0px solid transparent;
		border-radius: 120px;
		cursor: pointer;
		padding: 0.75rem 1.5rem;
		font-family: 'Open Sans', sans-serif;
		font-weight: 600;
		background: var(--color);
		transition: 250ms;
	}

	button:hover,
	button:focus {
		filter: brightness(0.9);
	}

	button:active {
		filter: brightness(0.8);
		transform: scale(0.975);
	}
</style>
