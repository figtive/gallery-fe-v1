<script lang="ts">
	import { ProjectFieldTypeLabel } from '$lib/constant';

	import type { Project } from '$lib/dtos';
	import Tag from './Tag.svelte';

	export let project: Project;
	export let onClick: () => void = () => {};
</script>

<div
	class="card"
	on:click={onClick}
	on:keydown={(e) => e.key === 'Enter' && onClick()}
	tabindex="0"
>
	<div class="image">
		<img src={project.thumbnail} alt={project.name} />
	</div>
	<div class="content">
		<p class="name">{project.name}</p>
		<p class="team">{project.team}</p>
		<div class="tags">
			<Tag color="secondary">{new Date(project.createdAt).getFullYear()}</Tag>
			<Tag color={project.active ? 'success' : 'disabled'}>
				{project.active ? 'Active' : 'Archived'}
			</Tag>
			<Tag color="info">{ProjectFieldTypeLabel[project.field]}</Tag>
		</div>
		<p class="description">{project.description}</p>
	</div>
</div>

<style>
	.card {
		display: flex;
		flex-direction: column;
		width: 360px;
		padding: 0;
		border-radius: 1.5rem;
		overflow: hidden;
		cursor: pointer;
		box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.25);
		transition: box-shadow 0.2s ease-in-out;
	}

	.card:hover,
	.card:focus {
		box-shadow: 0 0.75rem 1.5rem rgba(0, 0, 0, 0.35);
	}

	.card .image {
		background-color: #eee;
		height: 220px;
		overflow: hidden;
	}

	.card .image img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center center;
	}

	.card .content {
		background-color: #fff;
		flex-grow: 1;
		padding: 1rem 1.2rem 1.2rem 1.2rem;
	}

	.card .content .name {
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: 4px;
	}

	.card .content .team {
		margin-bottom: 12px;
	}

	.card .content .tags {
		display: flex;
		flex-wrap: wrap;
		margin: -4px -4px;
		margin-bottom: 8px;
	}

	.card .content .tags > :global(*) {
		margin: 4px;
	}
</style>
