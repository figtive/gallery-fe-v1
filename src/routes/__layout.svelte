<script lang="ts">
	import { page } from '$app/stores';
	import BannerList from '$lib/components/BannerList.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';

	$: isLanding = $page.path.length <= 1;
</script>

<div class={isLanding && 'hidden'}>
	<Navbar />
</div>
<BannerList />
<slot />
<div class={isLanding && 'hidden'}>
	<Footer />
</div>

<style lang="css">
	:global(:root) {
		--navbar-height: 64px;
		--footer-height: 128px;
		--color-text-primary: #333;
		--color-text-secondary: #888;
		--color-primary: #615cc1;
		--color-secondary: #cf66aa;
		--color-disabled: #aaaaaa;
		--color-success: #1fa835;
		--color-info: #266dd9;
		--color-warning: #e5b812;
		--color-error: #bc1836;
	}

	:global(html),
	:global(body) {
		margin: 0;
		padding: 0;
		border: 0;
		font: inherit;
		vertical-align: baseline;
		color: var(--color-text-primary);
		overflow-x: hidden;
	}

	:global(h1),
	:global(h2),
	:global(h3),
	:global(h4),
	:global(h5),
	:global(h6) {
		font-family: 'Raleway', sans-serif;
		margin: 0;
		color: inherit;
	}

	:global(a),
	:global(p),
	:global(button),
	:global(ul),
	:global(ol),
	:global(li) {
		font-family: 'Open Sans', sans-serif;
		margin: 0;
		color: inherit;
	}

	:global(a) {
		text-decoration: none;
	}

	:global(main) {
		display: flex;
		flex-direction: column;
		min-height: calc(100vh - var(--navbar-height) - var(--footer-height));
		overflow: visible;
	}

	:global(.container) {
		width: 100%;
		max-width: 70%;
		margin: 0 auto;
		padding: 0 1rem;
	}

	:global(.head) {
		margin-top: 5rem;
		margin-bottom: 3rem;
	}

	:global(.hidden) {
		display: none;
	}

	:global(.page-title) {
		font-size: 3.5rem;
		width: fit-content;
		position: relative;
		font-weight: 800;
	}

	:global(.page-title::before) {
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

	:global(.page-subtitle) {
		font-size: 2rem;
		width: fit-content;
		font-weight: 600;
		color: var(--color-text-secondary);
	}

	:global(input),
	:global(select) {
		height: 40px;
		padding: 0 1.2rem;
		margin: 0;
		border: none;
		border-radius: 40px;
		background: #f8f8f8ee;
		border: 3px solid #ddde;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}
	:global(select) {
		padding-right: 2.4rem;
		background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
		background-repeat: no-repeat;
		background-position-x: calc(100% - 8px);
		background-position-y: 50%;
		-webkit-appearance: none;
		-moz-appearance: none;
	}

	:global(.glow-left) {
		position: fixed;
		z-index: -1;
		width: 80vh;
		height: 80vh;
		bottom: 0;
		left: 0;
		border-radius: 100%;
		filter: blur(20vh);
		transform: translate(-50%, 50%);
	}

	:global(.glow-right) {
		position: fixed;
		z-index: -1;
		width: 80vh;
		height: 80vh;
		bottom: 0;
		right: 0;
		border-radius: 100%;
		filter: blur(20vh);
		transform: translate(50%, 50%);
	}

	:global(.glow-purple) {
		background-color: #bebbff;
	}

	:global(.glow-yellow) {
		background-color: #f9eab3;
	}
</style>
