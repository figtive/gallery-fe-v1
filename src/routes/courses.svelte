<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { AuthManager } from '$lib/auth';

	const auth = new AuthManager();

	onMount(() => {
		if (!auth.isAuthenticated()) goto('/login', { replaceState: true });
	});
</script>

<h1>Courses</h1>

<btn
	on:click={() => {
		auth.deauthenticate();
		goto('/', { replaceState: true });
	}}
>
	Logout
</btn>
