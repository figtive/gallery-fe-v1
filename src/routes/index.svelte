<script lang="ts">
	/* eslint-disable @typescript-eslint/ban-ts-comment */
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { AuthManager, Response } from '$lib/auth';

	const auth = new AuthManager();

	onMount(() => {
		// @ts-ignore
		window.authCallback = (response: Response) => {
			auth.authenticate(response);
		};
		if (auth.isAuthenticated()) goto('/courses', { replaceState: true });
	});
</script>

<h1>Gallery PPL 2021</h1>

<div>
	<script src="https://accounts.google.com/gsi/client" async defer></script>
	<div
		id="g_id_onload"
		data-client_id={import.meta.env.VITE_GOOGLE_CLIENT_ID}
		data-context="signin"
		data-ux_mode="popup"
		data-callback="authCallback"
	/>

	<div
		class="g_id_signin"
		data-type="standard"
		data-shape="pill"
		data-theme="outline"
		data-text="signin_with"
		data-size="large"
		data-logo_alignment="left"
	/>
</div>
