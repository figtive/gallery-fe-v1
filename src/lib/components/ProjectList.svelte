<script lang="ts">
	import type { Project } from '$lib/dtos';
	import ProjectItem from './ProjectItem.svelte';

	export let projects: Project[];
	export let emptyMessage = '';
</script>

<div class="list">
	{#if projects.length}
		{#each projects as project (project.id)}
			<ProjectItem {project} />
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
		flex-wrap: wrap;
		margin: -1rem;
		justify-content: center;
	}

	.list > :global(*) {
		margin: 1rem;
	}

	.empty {
		margin-right: auto;
	}
</style>
