<script lang="ts">
	import { ClassTypeLabel, ProjectFieldTypeLabel } from '$lib/constant';
	import type { Project } from '$lib/dtos';
	import Tag from './Tag.svelte';

	export let project: Project;
</script>

<a class="card" href="/project/{project.id}">
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
			<Tag color="warning">{ClassTypeLabel[project.class]}</Tag>
			<Tag color="info">{ProjectFieldTypeLabel[project.field]}</Tag>
		</div>
		<p class="description">{project.description}</p>
	</div>
</a>

<style>
	.card {
		display: flex;
		flex-direction: column;
		width: 440px;
		padding: 0;
		border-radius: 1.5rem;
		overflow: hidden;
		cursor: pointer;
		box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.15);
		transition: box-shadow 120ms ease-in-out;
	}

	.card:hover,
	.card:focus {
		box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.3);
	}

	.image {
		background-color: #eee;
		height: 220px;
		overflow: hidden;
	}

	.image img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center center;
	}

	.content {
		background-color: #fff;
		flex-grow: 1;
		padding: 1rem 1.2rem 1.2rem 1.2rem;
	}

	.name {
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: 4px;
	}

	.team {
		margin-bottom: 12px;
		color: var(--color-text-secondary);
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		margin: -4px -4px;
		margin-bottom: 8px;
	}

	.tags > :global(*) {
		margin: 4px;
	}
</style>
