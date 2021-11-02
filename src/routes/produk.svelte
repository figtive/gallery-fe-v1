<script lang="ts">
	import { goto } from '$app/navigation';
	import { auth } from '$lib/auth';
	import Button from '$lib/components/Button.svelte';
</script>

<h1>Hi, {auth.getUserInfo().name}</h1>

<Button
	onClick={() => {
		auth.deauthenticate();
		goto('/', { replaceState: true });
	}}
>
	Logout
</Button>
