<script lang="ts">
	import type { Blog, Project } from '$lib/dtos';
	import LeaderboardItem from './LeaderboardItem.svelte';

	export let courseworks: Blog[] | Project[];
	export let emptyMessage = '';
</script>

<div class="list">
	{#if courseworks.length}
		{#each courseworks as coursework, position (coursework.id)}
			<LeaderboardItem {coursework} position={position + 1} />
		{/each}
	{:else}
		<div class="empty">
			<p>{emptyMessage}</p>
		</div>
	{/if}
</div>

<style lang="css">
	.list {
		display: flex;
		flex-direction: column;
	}

	.list > :global(*) {
		margin-bottom: 1rem;
	}

	.list > :global(*):last-child {
		margin-bottom: 0;
	}
</style>
