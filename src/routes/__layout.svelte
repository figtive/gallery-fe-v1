<script lang="ts">
	import { page } from '$app/stores';
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
</script>

{#if $page.path.length > 1}
	<Navbar />
{/if}
<slot />
{#if $page.path.length > 1}
	<Footer />
{/if}

<style lang="css" global>
	:root {
		--navbar-height: 64px;
		--footer-height: 128px;
		--color-text-primary: #333;
		--color-text-secondary: #888;
	}

	html,
	body {
		margin: 0;
		padding: 0;
		border: 0;
		font-size: 100%;
		font: inherit;
		vertical-align: baseline;
		color: var(--color-text-primary);
		overflow-x: hidden;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-family: 'Raleway', sans-serif;
		margin: 0;
		color: inherit;
	}

	a,
	p,
	button {
		font-family: 'Open Sans', sans-serif;
		margin: 0;
		color: inherit;
	}

	a {
		text-decoration: none;
	}

	main {
		display: flex;
		flex-direction: column;
		min-height: calc(100vh - var(--navbar-height) - var(--footer-height));
		overflow: visible;
	}

	.container {
		width: 100%;
		max-width: 70%;
		margin: 0 auto;
		padding: 0 1rem;
	}

	.head {
		margin-top: 3rem;
		margin-bottom: 3rem;
	}

	.hidden {
		display: none;
	}

	.page-title {
		font-size: 3.5rem;
		width: fit-content;
		position: relative;
		font-weight: 800;
	}

	.page-title::before {
		content: '';
		display: block;
		position: absolute;
		bottom: -0.2rem;
		left: 0.75rem;
		width: 100%;
		height: 24px;
		background: #f9eab3;
		z-index: -1;
	}

	input,
	select {
		height: 40px;
		padding: 0 1.2rem;
		margin: 0;
		border: none;
		border-radius: 40px;
		background: #f5f5f5;
		border: 1px solid #ccca;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}
	select {
		padding-right: 2.4rem;
		background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
		background-repeat: no-repeat;
		background-position-x: calc(100% - 8px);
		background-position-y: 50%;
		-webkit-appearance: none;
		-moz-appearance: none;
	}
</style>
