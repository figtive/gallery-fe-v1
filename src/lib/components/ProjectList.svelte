<script lang="ts">
	import type { Project } from '$lib/dtos';
	import ProjectItem from './ProjectItem.svelte';

	export let projects: Project[];
</script>

<div class="list">
	{#if projects}
		{#each projects as project (project.id)}
			<ProjectItem {project} />
		{/each}
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
</style>
