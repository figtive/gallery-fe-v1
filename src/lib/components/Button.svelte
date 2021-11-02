<script lang="ts">
	import { Color, colorSet } from '$lib/color';

	export let type: string = '';
	export let onClick: () => void = () => {};
	export let className: string = '';
	export let color: Color = 'primary';
	export let beforeIcon: string = '';
	export let afterIcon: string = '';
</script>

<button {type} on:click={onClick} class={className} style="--color: {colorSet[color]}">
	{#if beforeIcon}
		<span class="material-icons before-icon">{beforeIcon}</span>
	{/if}
	<span class="content">
		<slot />
	</span>
	{#if afterIcon}
		<span class="material-icons after-icon">{afterIcon}</span>
	{/if}
</button>

<style lang="css">
	button {
		color: white;
		height: fit-content;
		border: 0px solid transparent;
		border-radius: 120px;
		cursor: pointer;
		padding: 0;
		height: 40px;
		font-family: 'Open Sans', sans-serif;
		font-weight: 600;
		background: var(--color);
		transition: 100ms;
		display: flex;
		flex-direction: row;
		flex-shrink: 0;
		align-items: center;
	}

	button:hover,
	button:focus {
		filter: brightness(0.9);
	}

	button:active {
		filter: brightness(0.8);
	}

	.before-icon {
		padding-left: 1rem;
		margin-right: -0.75rem;
		font-size: 20px;
	}

	.content {
		padding: 0 1.5rem;
		font-size: 1rem;
	}

	.after-icon {
		padding-right: 1rem;
		margin-left: -0.75rem;
		font-size: 20px;
	}
</style>
