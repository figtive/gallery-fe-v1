<script lang="ts">
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
				auth.authenticate(response);
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
	<div class="content">
		<a href="/">
			<img src="{assets}/logo-small.png" alt="Gallery Fasilkom UI" class="logo" />
			<h3>Gallery Fasilkom UI</h3>
		</a>
		<div class="spacer" />
		<div class="links">
			{#if $isAuthenticated}
				<NavLink link="/dashboard">Dashboard</NavLink>
				<NavLink link="/my-vote">My Votes</NavLink>
				<NavLink link="/bookmark">Bookmarks</NavLink>
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
		align-items: center;
		height: var(--navbar-height);
		width: 100%;
		background-color: #fff;
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
	}

	.content {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin: 0 32px;
	}

	a {
		text-decoration: none;
		color: #333;
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
		margin-right: 20px;
	}

	.links > :global(*):last-child {
		margin-right: 0;
	}
</style>
