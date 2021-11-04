<script lang="ts">
	/* eslint-disable @typescript-eslint/ban-ts-comment */
	/* eslint-disable no-undef */
	import { onMount } from 'svelte';
	import { assets } from '$app/paths';
	import { auth, Response } from '$lib/auth';
	import NavLink from './NavLink.svelte';

	let isAuthenticated = auth.isAuthenticated();

	onMount(() => {
		// @ts-ignore
		google.accounts.id.initialize({
			client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
			callback: (response: Response) => {
				auth.authenticate(response).catch((e) => console.error(e));
			}
		});
		auth.isAuthenticated().subscribe((authed) => {
			if (authed) return;
			// @ts-ignore
			google.accounts.id.renderButton(document.getElementById('google-signin'), {
				theme: 'outline',
				shape: 'pill',
				size: 'large'
			});
			// @ts-ignore
			google.accounts.id.prompt();
		});
	});
</script>

<nav>
	<div class="navbar">
		<a href="/">
			<img src="{assets}/logo-small.png" alt="Gallery Fasilkom UI" class="logo" />
			<h3>Gallery Fasilkom UI</h3>
		</a>
		<div class="spacer" />
		<div class="links">
			{#if $isAuthenticated}
				<NavLink link="/dashboard">Dashboard</NavLink>
				<NavLink link="/bookmark">Bookmark</NavLink>
			{/if}
			<NavLink link="/leaderboard">Leaderboard</NavLink>
			<NavLink link="/project">Project</NavLink>
			<NavLink link="/blog">Blog</NavLink>
			<div id="google-signin" class={$isAuthenticated && 'hidden'} />
		</div>
	</div>
</nav>

<style>
	nav {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		height: var(--navbar-height);
		width: 100%;
		background-color: #fff;
		position: relative;
	}

	.navbar {
		flex-grow: 1;
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 0 32px;
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
	}

	a {
		display: flex;
		align-items: center;
	}

	a > img {
		width: 28px;
		margin-right: 8px;
	}

	.spacer {
		flex-grow: 1;
	}

	.links {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.links > :global(*) {
		margin-left: 20px;
	}

	.links > :global(*):first-child {
		margin-left: 0;
	}
</style>
