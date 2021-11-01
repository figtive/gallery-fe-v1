<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { auth } from '$lib/auth';
	import Button from '$lib/components/Button.svelte';

	onMount(() => {
		if (!auth.isAuthenticated()) goto('/login', { replaceState: true });
	});
</script>

<h1>Courses</h1>

<Button
	onClick={() => {
		auth.deauthenticate();
		goto('/', { replaceState: true });
	}}
>
	Logout
</Button>
