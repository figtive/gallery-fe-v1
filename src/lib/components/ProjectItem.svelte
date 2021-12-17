<script lang="ts">
	import { CDN_BASE_URL, CourseTypeLabel, ProjectFieldTypeLabel } from '$lib/constant';
	import type { Project } from '$lib/dtos';
	import Spinner from './Spinner.svelte';
	import Tag from './Tag.svelte';

	export let project: Project;
</script>

<a class="card" href="/project/{project.courseId}/{project.id}">
	<div class="image">
		<img src="{CDN_BASE_URL}{project.thumbnail && project.thumbnail[0]}" alt={project.name} />
		<div class="placeholder">
			<Spinner />
		</div>
	</div>
	<div class="content">
		<p class="name">{project.name}</p>
		<p class="team">{project.team}</p>
		<div class="tags">
			<Tag color="secondary">{new Date(project.createdAt).getFullYear()}</Tag>
			<Tag color={project.active ? 'success' : 'disabled'}>
				{project.active ? 'Active' : 'Archived'}
			</Tag>
			<Tag color="warning">{CourseTypeLabel[project.courseId]}</Tag>
			<Tag color="info">{ProjectFieldTypeLabel[project.field]}</Tag>
		</div>
		<p class="description">{project.description}</p>
	</div>
</a>

<style>
	.card {
		display: flex;
		flex-direction: column;
		width: 380px;
		padding: 0;
		border-radius: 1.5rem;
		overflow: hidden;
		cursor: pointer;
		box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.15);
		transition: box-shadow 120ms ease-in-out;
    	-webkit-transform: translate3d(0,0,0);
	}

	.card:hover,
	.card:focus {
		box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.3);
	}

	.image {
		background-color: #eee;
		height: 220px;
		overflow: hidden;
		position: relative;
		display: flex;
	}

	.image img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center center;
		z-index: 1;
	}

	.image .placeholder {
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 100%;
		z-index: 0;
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
