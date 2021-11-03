<script lang="ts">
	import { page } from '$app/stores';
	import api from '$lib/api';
	import { auth } from '$lib/auth';
	import Button from '$lib/components/Button.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import Tag from '$lib/components/Tag.svelte';
	import Title from '$lib/components/Title.svelte';
	import { CourseTypeLabel, ProjectFieldTypeLabel } from '$lib/constant';
	import type { Project, ProjectMetadata } from '$lib/dtos';
	import { onMount } from 'svelte';

	let isAuthenticated = auth.isAuthenticated();

	let project: Project;
	let metadata: ProjectMetadata;
	let isVoted: boolean = undefined;

	let isLoaded = false;
	let error: Error;

	const getProject = async (): Promise<Project> => {
		return await api.coursework.project.getOne($page.params.id);
	};

	const handleVote = () => {
		// TODO: impl vote
		isVoted = !isVoted;
	};

	$: if ($isAuthenticated) {
		//TODO: fetch vote status
		setTimeout(() => {
			isVoted = false;
		}, 1000);
	}

	onMount(async () => {
		try {
			project = await getProject();
			metadata = JSON.parse(project.metadata || '') as ProjectMetadata;
		} catch (e) {
			console.error(e);
			error = e;
		} finally {
			isLoaded = true;
		}
	});
</script>

<Title title="Project" />
<main>
	<div class="container">
		{#if isLoaded && !error}
			<div class="head">
				<h1 class="page-title">{project.name}</h1>
				<h2 class="page-subtitle">{project.team}</h2>
			</div>
			<div class="body">
				<div class="image">
					<img src={project.thumbnail} alt="project thumbnail" />
					<div class="placeholder">
						<Spinner />
					</div>
				</div>
				<div class="detail">
					<div class="actions">
						<Button beforeIcon="link" style="outline">Link to Project</Button>
						<Button beforeIcon="share" style="outline" color="info">Share</Button>
						{#if $isAuthenticated && isVoted !== undefined}
							<Button
								beforeIcon="how_to_vote"
								style="outline"
								color={isVoted ? 'error' : 'success'}
								onClick={handleVote}
							>
								{isVoted ? 'Unvote' : 'Vote'}
							</Button>
						{/if}
					</div>
					<div class="tags">
						<Tag color="secondary">{new Date(project.createdAt).getFullYear()}</Tag>
						<Tag color={project.active ? 'success' : 'disabled'}>
							{project.active ? 'Active' : 'Archived'}
						</Tag>
						<Tag color="warning">{CourseTypeLabel[project.course]}</Tag>
						<Tag color="info">{ProjectFieldTypeLabel[project.field]}</Tag>
					</div>
					<p class="description">{project.description}</p>
					{#if metadata}
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
					{/if}
				</div>
			</div>
		{:else if error}
			<div class="head">
				<h1>Failed loading project!</h1>
			</div>
		{:else}
			<div class="head">
				<Spinner />
			</div>
		{/if}
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
		position: relative;
		display: flex;
	}

	.image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
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

	.detail {
		display: block;
		flex-grow: 1;
	}

	.actions,
	.tags {
		display: flex;
		flex-wrap: wrap;
		margin: -4px -4px;
		margin-bottom: 8px;
	}

	.actions > :global(*),
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
