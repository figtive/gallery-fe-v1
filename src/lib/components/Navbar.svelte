<script lang="ts">
	/* eslint-disable @typescript-eslint/ban-ts-comment */
	/* eslint-disable no-undef */
	import { assets } from '$app/paths';
	import { page } from '$app/stores';
	import { auth, Response } from '$lib/auth';
	import { onMount } from 'svelte';
	import NavLink from './NavLink.svelte';
	import { notify } from '$lib/notification';
	import api from '$lib/api';
	import { aggregatedVoteQuota } from '$lib/store';
	import { CourseType } from '$lib/constant';

	let isAuthenticated = auth.isAuthenticated();

	let width;
	let menuOpen = false;

	const onNavigate = () => (menuOpen = width >= 768);

	onMount(() => {
		// @ts-ignore
		google.accounts.id.initialize({
			client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
			callback: (response: Response) => {
				auth.authenticate(response).catch((e) => {
					console.error(e);
					notify({
						message: 'Failed to sign in!',
						type: 'error'
					});
				});
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
		onNavigate(); // reset menuOpen
	});

	$: if ($isAuthenticated) {
		api.vote
			.getQuota()
			.then((quota) => {
				aggregatedVoteQuota.set(quota);
			})
			.catch((e) => {
				console.error(e);
			});
	}

	$: width, onNavigate(); // reset menuOpen on window resize
</script>

<nav bind:clientWidth={width}>
	<div class="navbar">
		<a href="/">
			<img src="{assets}/logo-small.png" alt="Gallery Fasilkom UI" class="logo" />
			<h3>Gallery Fasilkom UI</h3>
		</a>
		<div class="spacer" />
		<div class={`links ${!menuOpen && 'hidden'}`}>
			{#if $isAuthenticated}
				<NavLink onClick={onNavigate} link="/dashboard">Dashboard</NavLink>
				<NavLink onClick={onNavigate} link="/bookmark">Bookmark</NavLink>
			{/if}
			<NavLink onClick={onNavigate} link="/leaderboard">Leaderboard</NavLink>
			<NavLink onClick={onNavigate} link="/project/{CourseType.PPL}" matcher="/project">
				Project
			</NavLink>
			<NavLink onClick={onNavigate} link="/blog">Blog</NavLink>
			<div id="google-signin" class={$isAuthenticated && 'hidden'} />
		</div>
		<div
			class="menu-btn"
			on:click={() => {
				menuOpen = !menuOpen;
			}}
		>
			<span class="material-icons before-icon">{menuOpen ? 'close' : 'menu'}</span>
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

	.menu-btn {
		display: none;
		width: 32px;
		height: 32px;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}

	@media (max-width: 1025px) {
	}

	@media (max-width: 768px) {
		.menu-btn {
			display: flex;
		}

		.links {
			flex-direction: column;
			align-items: flex-start;
			position: absolute;
			top: var(--navbar-height);
			left: 0;
			background: #fff;
			width: 100%;
			z-index: 5;
			box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
		}

		.links > :global(*) {
			margin: 1rem 1.5rem;
		}

		.links > :global(*):first-child {
			margin-left: 1.5rem;
		}
	}

	@media (max-width: 320px) {
	}
</style>
