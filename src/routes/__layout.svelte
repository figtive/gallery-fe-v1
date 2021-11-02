<script lang="ts">
	import { onMount } from 'svelte';
	import { auth, Response } from '$lib/auth';

	onMount(() => {
		let isAuthenticated = auth.isAuthenticated();
		// @ts-ignore
		google.accounts.id.initialize({
			client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
			callback: (response: Response) => {
				auth.authenticate(response);
			}
		});
		isAuthenticated.subscribe((authed) => {
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

<slot />

<style lang="css" global>
	html,
	body {
		margin: 0;
		padding: 0;
		border: 0;
		font-size: 100%;
		font: inherit;
		vertical-align: baseline;
		color: #333;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-family: 'Raleway', sans-serif;
		margin: 0;
	}

	p {
		font-family: 'Open Sans', sans-serif;
		margin: 0;
	}

	main {
		min-height: 100vh;
	}

	.hidden {
		display: none;
	}
</style>
