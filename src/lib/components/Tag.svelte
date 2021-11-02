<script lang="ts">
	import { Color, colorSet } from '$lib/color';

	export let className: string = '';
	export let color: Color = 'primary';
</script>

<span class={className} style="--color: {colorSet[color]}">
	<slot />
</span>

<style lang="css">
	span {
		display: inline-block;
		color: white;
		height: fit-content;
		border: 0px solid transparent;
		border-radius: 120px;
		padding: 0.2rem 1rem;
		font-size: 0.8rem;
		font-family: 'Open Sans', sans-serif;
		font-weight: 400;
		white-space: nowrap;
		background: var(--color);
	}
</style>
