<script lang="ts">
	import { page } from '$app/stores';
	import { slide } from 'svelte/transition';
	import { auth } from '$lib/auth';
	import { voteQuota } from '$lib/store';
	import BannerItem from './BannerItem.svelte';

	let isAuthenticated = auth.isAuthenticated();
</script>

<div class="list">
	{#if $isAuthenticated}
		{#if $page.path.includes('/project') && $voteQuota.project > 0}
			<div transition:slide>
				<BannerItem color="success">
					You have {$voteQuota.project} project vote{$voteQuota.project > 1 ? 's' : ''} remaining!
				</BannerItem>
			</div>
		{/if}
		{#if $page.path.includes('/blog') && $voteQuota.blog > 0}
			<div transition:slide>
				<BannerItem color="success">
					You have {$voteQuota.blog} blog vote{$voteQuota.blog > 1 ? 's' : ''} remaining!
				</BannerItem>
			</div>
		{/if}
	{/if}
</div>

<style lang="css">
	.list {
		position: absolute;
		display: flex;
		flex-direction: column;
		width: 100%;
	}
</style>
