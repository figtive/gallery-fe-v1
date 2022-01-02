<script lang="ts">
	import { onMount } from 'svelte';
	import api from '$lib/api';
	import CourseworkTab from '$lib/components/CourseworkTab.svelte';
	import LeaderboardList from '$lib/components/LeaderboardList.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import Title from '$lib/components/Title.svelte';
	import { CourseType } from '$lib/constant';
	import type { Blog, Project } from '$lib/dtos';
	import { notify } from '$lib/notification';

	let projects: Project[];
	let blogs: Blog[];

	let isLoaded = false;
	let error: Error;
	let errorNotification: number;

	const getProjects = async (): Promise<Project[]> => {
		return await api.leaderboard.getProject(CourseType.PPL);
	};

	const getBlogs = async (): Promise<Blog[]> => {
		return await api.leaderboard.getBlog(CourseType.PPL);
	};

	onMount(async () => {
		try {
			projects = await getProjects();
			blogs = await getBlogs();
		} catch (e) {
			console.error(e);
			errorNotification = notify({
				message: 'Failed to load leaderboard!',
				type: 'error',
				autoClose: false
			});
			error = e;
		} finally {
			isLoaded = true;
		}
	});
</script>

<Title title="Leaderboard" />
<main>
	<div class="container">
		<div class="head">
			<h1 class="page-title">Leaderboard</h1>
		</div>
		{#if isLoaded && !error}
			<div class="body">
				<CourseworkTab>
					<LeaderboardList
						slot="project"
						courseworks={projects}
						emptyMessage="Start voting projects to see them here!"
					/>
					<LeaderboardList
						slot="blog"
						courseworks={blogs}
						emptyMessage="Start voting blogs to see them here!"
					/>
				</CourseworkTab>
			</div>
		{:else if !isLoaded}
			<Spinner />
		{/if}
	</div>
	<div class="glow-left glow-purple" />
	<div class="glow-right glow-yellow" />
</main>
