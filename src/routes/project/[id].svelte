<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import Tag from '$lib/components/Tag.svelte';
	import Title from '$lib/components/Title.svelte';
	import { ClassTypeLabel, ProjectFieldTypeLabel } from '$lib/constant';
	import type { Project, ProjectMetadata } from '$lib/dtos';
	import { projects } from '$lib/dummy';

	$: project = projects.filter((project: Project): boolean => project.id === $page.params.id)[0];
	$: metadata = JSON.parse(project.metadata) as ProjectMetadata;
</script>

<Title title="Project" />
<main>
	<div class="container">
		<div class="head">
			<h1 class="page-title">{project.name}</h1>
			<h2 class="page-subtitle">{project.team}</h2>
		</div>
		<div class="body">
			<div class="image">
				<img src={project.thumbnail} alt="project thumbnail" />
			</div>
			<div class="detail">
				<div class="actions">
					<Button beforeIcon="link" style="outline">Link to Project</Button>
					<Button beforeIcon="share" style="outline" color="info">Share</Button>
					<Button beforeIcon="how_to_vote" style="outline" color="success">Vote</Button>
				</div>
				<div class="tags">
					<Tag color="secondary">{new Date(project.createdAt).getFullYear()}</Tag>
					<Tag color={project.active ? 'success' : 'disabled'}>
						{project.active ? 'Active' : 'Archived'}
					</Tag>
					<Tag color="warning">{ClassTypeLabel[project.class]}</Tag>
					<Tag color="info">{ProjectFieldTypeLabel[project.field]}</Tag>
				</div>
				<p class="description">{project.description}</p>
				<div class="metadata">
					{#if metadata.partner}
						<div>
							<h3>Partner</h3>
							<p>{metadata.partner}</p>
						</div>
					{/if}
					{#if metadata.productOwner.length}
						<div>
							<h3>Product Owner</h3>
							<ul>
								{#each metadata.productOwner as name}
									<li>{name}</li>
								{/each}
							</ul>
						</div>
					{/if}
					{#if metadata.scrumMaster.length}
						<div>
							<h3>Scrum Master</h3>
							<ul>
								{#each metadata.scrumMaster as name}
									<li>{name}</li>
								{/each}
							</ul>
						</div>
					{/if}
					{#if metadata.developmentTeam.length}
						<div>
							<h3>Development Team</h3>
							<ul>
								{#each metadata.developmentTeam as name}
									<li>{name}</li>
								{/each}
							</ul>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
	<div class="glow-left glow-purple" />
</main>

<style lang="css">
	* {
		/* border: 1px solid red; */
	}

	.body {
		display: flex;
		flex-direction: row;
	}

	.body > :global(*) {
		margin: 1rem;
	}

	.image {
		flex-shrink: 0;
		width: 60%;
		height: 50vh;
		border-radius: 1.5rem;
		overflow: hidden;
		background-color: #eee;
	}

	.image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.detail {
		display: block;
		flex-grow: 1;
	}

	.actions {
		display: flex;
		margin: -4px -4px;
		margin-bottom: 8px;
	}

	.actions > :global(*) {
		margin: 4px;
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

	.description {
		margin-bottom: 16px;
	}

	.metadata > :global(*) {
		margin-bottom: 16px;
	}
</style>
