<script lang="ts">
	import { onMount } from 'svelte';
	import api from '$lib/api';
	import { auth, requireAuth } from '$lib/auth';
	import BlogList from '$lib/components/BlogList.svelte';
	import CourseworkTab from '$lib/components/CourseworkTab.svelte';
	import ProjectList from '$lib/components/ProjectList.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import Tag from '$lib/components/Tag.svelte';
	import Title from '$lib/components/Title.svelte';
	import { CourseType, CourseTypeLabel } from '$lib/constant';
	import type { Blog, Project } from '$lib/dtos';
	import { notify } from '$lib/notification';
	import { aggregatedVoteQuota } from '$lib/store';

	let name = auth.getUserInfo().given_name;

	let projects: Project[];
	let blogs: Blog[];

	let isLoaded = false;
	let error: Error;
	let errorNotification: number;

	const getProjects = async (): Promise<Project[]> => {
		return await api.vote.getVotedProjects();
	};

	const getBlogs = async (): Promise<Blog[]> => {
		return await api.vote.getVotedBlogs();
	};

	onMount(async () => {
		try {
			projects = await getProjects();
			blogs = await getBlogs();
		} catch (e) {
			console.error(e);
			errorNotification = notify({
				message: 'Failed to load voted courseworks!',
				type: 'error',
				autoClose: false
			});
			error = e;
		} finally {
			isLoaded = true;
		}
	});

	// requireAuth();
</script>

<Title title="Dashboard" />
<main>
	<div class="container">
		<div class="head">
			<h1 class="page-title">Hi{name && ', '}{name}!</h1>
		</div>
		<div class="body">
			<h2>Remaining Votes</h2>
			<div class="vote-list">
				<div class="vote-group">
					<h3>{CourseTypeLabel[CourseType.PPL]}</h3>
					<div class="vote-count">
						<p>Project</p>
						<Tag color={$aggregatedVoteQuota[CourseType.PPL].projects > 0 ? 'success' : 'error'}>
							{$aggregatedVoteQuota[CourseType.PPL].projects}
						</Tag>
					</div>
					<div class="vote-count">
						<p>Blog</p>
						<Tag color={$aggregatedVoteQuota[CourseType.PPL].blogs > 0 ? 'success' : 'error'}>
							{$aggregatedVoteQuota[CourseType.PPL].blogs}
						</Tag>
					</div>
				</div>
				<div class="vote-group">
					<h3>{CourseTypeLabel[CourseType.Propensi]}</h3>
					<div class="vote-count">
						<p>Project</p>
						<Tag
							color={$aggregatedVoteQuota[CourseType.Propensi].projects > 0 ? 'success' : 'error'}
						>
							{$aggregatedVoteQuota[CourseType.Propensi].projects}
						</Tag>
					</div>
					<div class="vote-count">
						<p>Blog</p>
						<Tag color={$aggregatedVoteQuota[CourseType.Propensi].blogs > 0 ? 'success' : 'error'}>
							{$aggregatedVoteQuota[CourseType.Propensi].blogs}
						</Tag>
					</div>
				</div>
			</div>
			{#if isLoaded && !error}
				<h2>My Votes</h2>
				<CourseworkTab>
					<ProjectList slot="project" emptyMessage="You have not voted any projects!" {projects} />
					<BlogList slot="blog" emptyMessage="You have not voted any blogs!" {blogs} />
				</CourseworkTab>
			{:else if !isLoaded}
				<Spinner />
			{/if}
		</div>
		<div class="glow-left glow-yellow" />
	</div>
</main>

<style lang="css">
	h2 {
		margin-top: 0;
		margin-bottom: 1rem;
	}

	.vote-list {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
		margin-bottom: 2rem;
	}

	.vote-group {
		display: flex;
		align-items: center;
		padding: 1rem 1.25rem;
		border: 3px solid #ddde;
		border-radius: 32px;
		background: #fafafa88;
		margin: 0.25rem 1rem 0.25rem 0;
	}

	.vote-group:last-child {
		margin-right: 0;
	}

	.vote-group > h3 {
		margin-right: 1rem;
	}

	.vote-count {
		display: flex;
		flex-direction: row;
		margin-right: 1rem;
	}

	.vote-count:last-child {
		margin-right: 0;
	}

	.vote-count > p {
		margin-right: 4px;
		font-weight: 600;
	}
</style>
