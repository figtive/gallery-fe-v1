<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import api from '$lib/api';
	import { auth } from '$lib/auth';
	import Button from '$lib/components/Button.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import Tag from '$lib/components/Tag.svelte';
	import Title from '$lib/components/Title.svelte';
	import { CDN_BASE_URL, CourseType, CourseTypeLabel, ProjectFieldTypeLabel } from '$lib/constant';
	import type { Project, ProjectMetadata } from '$lib/dtos';
	import { aggregatedVoteQuota, currentCourseType } from '$lib/store';
	import { notify } from '$lib/notification';
	import { fade } from 'svelte/transition';

	let isAuthenticated = auth.isAuthenticated();

	let courseId = $page.params.courseId as CourseType;
	let projectId = $page.params.id;
	let project: Project;
	let metadata: ProjectMetadata;
	let isVoted: boolean = undefined;

	let isLoaded = false;
	let error: Error;
	let errorNotification: number;

	let activeThumbnail = 0;
	let haltThumbnail = false;

	const getProject = async (): Promise<Project> => {
		currentCourseType.set(courseId);
		return await api.coursework.project.getOne(courseId, projectId);
	};

	const handleVote = () => {
		api.vote
			.cast(projectId, !isVoted)
			.then(() => {
				isVoted = !isVoted;
				api.vote
					.getQuota()
					.then((quota) => {
						aggregatedVoteQuota.set(quota);
					})
					.catch((e) => {
						console.error(e);
					});
			})
			.catch((e) => {
				console.error(e);
			});
	};

	$: if ($isAuthenticated) {
		api.vote
			.getStatus(projectId)
			.then((status) => {
				isVoted = status;
			})
			.catch((e) => {
				console.error(e);
			});
	}

	onMount(async () => {
		if (!Object.values(CourseType).includes(courseId)) {
			goto(`/project/${CourseType.PPL}`, { replaceState: true, noscroll: true });
			return;
		}
		try {
			project = await getProject();
			metadata = JSON.parse(project.metadata || '') as ProjectMetadata;
			if (project.courseId !== courseId) {
				throw Error('Failed to load project details!');
			}
		} catch (e) {
			console.error(e);
			errorNotification = notify({
				message: 'Failed to load project details!',
				type: 'error',
				autoClose: false
			});
			error = e;
		} finally {
			isLoaded = true;
		}
		setInterval(() => {
			if (!haltThumbnail) {
				activeThumbnail = (activeThumbnail + 1) % project.thumbnail.length;
			}
		}, 5000);
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
					<div
						class="item"
						on:mouseenter={() => (haltThumbnail = true)}
						on:mouseleave={() => (haltThumbnail = false)}
					>
						{#if haltThumbnail}
							<div transition:fade={{ duration: 200 }} class="controls">
								<span
									class="prev material-icons"
									on:click={() => {
										activeThumbnail =
											(activeThumbnail - 1 + project.thumbnail.length) % project.thumbnail.length;
									}}
								>
									chevron_left
								</span>
								<div class="counter">
									{#each project.thumbnail as _, i}
										<div class={activeThumbnail === i ? 'active' : ''} />
									{/each}
								</div>
								<span
									class="next material-icons"
									on:click={() => {
										activeThumbnail = (activeThumbnail + 1) % project.thumbnail.length;
									}}
								>
									navigate_next
								</span>
							</div>
						{/if}
						{#each project.thumbnail as thumbnail, i}
							{#if activeThumbnail === i}
								<img
									transition:fade={{ duration: 200 }}
									class="thumbnail"
									src="{CDN_BASE_URL}{thumbnail}"
									alt={thumbnail}
								/>
							{/if}
						{/each}
					</div>
					<div class="item">
						<iframe
							title="Video"
							type="text/html"
							width="1920"
							height="1080"
							src="https://www.youtube.com/embed/TNiRzMzQAm4"
							frameborder="0"
						/>
					</div>
				</div>
				<div class="detail">
					<div class="actions">
						{#if project.link}
							<a href={project.link} target="_blank" rel="noopener noreferrer">
								<Button beforeIcon="link" style="outline">View Project</Button>
							</a>
						{/if}
						{#if $isAuthenticated && isVoted !== undefined}
							<Button
								beforeIcon="how_to_vote"
								style="outline"
								disabled={!isVoted && $aggregatedVoteQuota[project.courseId].projects <= 0}
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
						<Tag color="warning">{CourseTypeLabel[project.courseId]}</Tag>
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
							{#if metadata.productOwner}
								<div>
									<h3>Product Owner</h3>
									<ul>
										{#each metadata.productOwner as name}
											<li>{name}</li>
										{/each}
									</ul>
								</div>
							{/if}
							{#if metadata.scrumMaster}
								<div>
									<h3>Scrum Master</h3>
									<ul>
										{#each metadata.scrumMaster as name}
											<li>{name}</li>
										{/each}
									</ul>
								</div>
							{/if}
							{#if metadata.developmentTeam}
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
		{:else if !isLoaded}
			<div class="head">
				<Spinner />
			</div>
		{/if}
	</div>
	<div class="glow-left glow-purple" />
</main>

<style lang="css">
	.body {
		display: flex;
		flex-direction: row;
	}

	.body > :global(*) {
		margin: 1rem;
	}

	.image {
		width: 60%;
		display: flex;
		flex-direction: column;
	}

	.image > .item {
		flex-shrink: 0;
		border-radius: 1.5rem;
		overflow: hidden;
		background-color: #eee;
		position: relative;
		display: flex;
		margin-bottom: 2rem;
		aspect-ratio: 16/9;
		box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.15);
	}

	.image > .item:last-child {
		margin-bottom: 0;
	}

	.image > .item > img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		z-index: 1;
		position: absolute;
	}

	.image > .item > .controls {
		width: 100%;
		height: 100%;
		z-index: 2;
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #fff;
		user-select: none;
	}

	.image > .item > .controls > span {
		font-size: 4rem;
		padding: 0.5rem;
		margin: 1rem;
		border-radius: 100%;
		background-color: #fff0;
		transition: background-color 0.2s ease;
		cursor: pointer;
	}

	.image > .item > .controls > span:hover {
		background-color: #fff4;
	}

	.image > .item > .controls > .counter {
		display: flex;
		flex-direction: row;
		align-self: flex-end;
		margin: 1rem;
	}

	.image > .item > .controls > .counter > div {
		margin: 0.5rem;
		height: 12px;
		width: 12px;
		border-radius: 100%;
		background-color: #fff4;
		transition: background-color 0.4s ease;
	}

	.image > .item > .controls > .counter > .active {
		margin: 0.5rem;
		height: 12px;
		width: 12px;
		background-color: #fff;
	}

	.image > .item > iframe {
		width: 100%;
		height: 100%;
		object-fit: cover;
		z-index: 1;
		position: absolute;
	}

	.detail {
		display: block;
		flex-basis: 0;
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
