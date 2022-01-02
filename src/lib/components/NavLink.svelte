<script lang="ts">
	import { page } from '$app/stores';

	export let link: string;
	export let matcher: string = link;
	export let onClick: (e: MouseEvent) => void = undefined;

	$: active = $page.path.includes(matcher);
</script>

<a href={link} data-active={active} on:click={onClick}><slot /></a>

<style lang="css">
	a {
		position: relative;
		font-weight: 600;
		z-index: 1;
	}

	a[data-active='true']::before,
	a:hover::before {
		content: ' ';
		display: block;
		position: absolute;
		bottom: -0.2rem;
		width: 100%;
		height: 4px;
		background: #85b4fb;
		z-index: -1;
	}
</style>
