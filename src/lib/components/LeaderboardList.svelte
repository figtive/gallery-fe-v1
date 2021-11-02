<script lang="ts">
	import type { Blog, Project } from '$lib/dtos';
	import LeaderboardItem from './LeaderboardItem.svelte';

	export let courseworks: Blog[] | Project[];
</script>

<div class="list">
	{#each courseworks as coursework, position (coursework.id)}
		<LeaderboardItem {coursework} position={position + 1} />
	{/each}
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
