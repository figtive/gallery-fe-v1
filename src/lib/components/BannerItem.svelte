<script lang="ts">
	import { Color, colorSet } from '$lib/color';

	export let color: Color = 'primary';
</script>

<div class="banner" style="--color: {colorSet[color]}">
	<p><slot /></p>
</div>

<style lang="css">
	:root {
		--banner-height: 48px;
	}

	.banner {
		background-color: var(--color);
		min-height: var(--banner-height);
		width: 100%;
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.banner > p {
		color: #fff;
		font-weight: 600;
		padding: 0 36px;
	}
</style>
