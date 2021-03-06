<script lang="ts">
	import { Color, colorSet } from '$lib/color';

	export let type = '';
	export let onClick: () => void = () => {
		/* noop */
	};
	export let className = '';
	export let disabled = false;
	export let color: Color = 'primary';
	export let style: 'solid' | 'outline' = 'solid';
	export let beforeIcon = '';
	export let afterIcon = '';
</script>

<button
	{type}
	{disabled}
	on:click={onClick}
	class={className}
	style="--color: {colorSet[color]}"
	data-style={style}
	data-disabled={disabled ? 'true' : 'false'}
>
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
		height: fit-content;
		border-radius: 120px;
		cursor: pointer;
		padding: 0;
		height: 40px;
		font-family: 'Open Sans', sans-serif;
		font-weight: 600;
		transition: 100ms;
		display: flex;
		flex-direction: row;
		flex-shrink: 0;
		align-items: center;
		box-sizing: border-box;
		transition: box-shadow 120ms ease-in-out, filter 100ms ease-in-out;
		-moz-user-select: none;
		-webkit-user-select: none;
	}

	button:hover {
		box-shadow: 0px 0px 4px 0px var(--color);
	}

	button:active {
		filter: brightness(0.9);
	}

	button[data-style='solid'] {
		color: #fff;
		background: var(--color);
		border: none;
	}

	button[data-style='outline'] {
		color: var(--color);
		background: #fff;
		border: 3px solid var(--color);
	}

	button[data-disabled='true'] {
		cursor: initial;
	}

	button[data-disabled='true']:hover {
		box-shadow: initial;
	}

	button[data-disabled='true']:active {
		filter: initial;
	}

	button[data-style='solid'][data-disabled='true'] {
		color: #fff;
		background: #aaa;
		border: none;
	}

	button[data-style='outline'][data-disabled='true'] {
		color: #aaa;
		background: #eee;
		border: 3px solid #aaa;
	}

	.before-icon {
		padding-left: 1rem;
		margin-right: -0.75rem;
		font-size: 20px;
		width: 20px;
	}

	.content {
		display: flex;
		flex-shrink: 0;
		padding: 0 1.5rem;
		font-size: 1rem;
	}

	.after-icon {
		padding-right: 1rem;
		margin-left: -0.75rem;
		font-size: 20px;
		width: 20px;
	}
</style>
