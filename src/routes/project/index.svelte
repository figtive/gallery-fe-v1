<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import api from '$lib/api';
	import Button from '$lib/components/Button.svelte';
	import ProjectList from '$lib/components/ProjectList.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import Title from '$lib/components/Title.svelte';
	import {
		CourseType,
		CourseTypeLabel,
		ProjectFieldType,
		ProjectFieldTypeLabel
	} from '$lib/constant';
	import type { Project } from '$lib/dtos';
	import { notify, unNotify } from '$lib/notification';
	import { onMount } from 'svelte';

	let projects: Project[];

	let searchQuery: string = $page.query.get('query') || '';
	let searchCourse: CourseType = ($page.query.get('course') || CourseType.PPL) as CourseType;
	let searchField: ProjectFieldType = ($page.query.get('field') || '') as ProjectFieldType;

	let isLoaded = false;
	let error: Error;
	let errorNotification: number;

	const getProjects = async (query, course, field): Promise<Project[]> => {
		return await api.coursework.project.getAll(query, course, field);
	};

	const handleSearch = async () => {
		isLoaded = false;
		error = undefined;
		unNotify(errorNotification);
		goto(
			`?${new URLSearchParams({ query: searchQuery, course: searchCourse, field: searchField })}`,
			{ replaceState: true, noscroll: true }
		);
		try {
			projects = await getProjects(searchQuery, searchCourse, searchField);
		} catch (e) {
			console.error(e);
			errorNotification = notify({
				message: 'Failed to load projects!',
				type: 'error',
				autoClose: false
			});
			error = e;
		} finally {
			isLoaded = true;
		}
	};

	onMount(async () => {
		try {
			projects = await getProjects(searchQuery, searchCourse, searchField);
			// TODO: refresh voteQuota
		} catch (e) {
			console.error(e);
			errorNotification = notify({
				message: 'Failed to load projects!',
				type: 'error',
				autoClose: false
			});
			error = e;
		} finally {
			isLoaded = true;
		}
	});
</script>

<Title title="Project" />
<main>
	<div class="container">
		<div class="head">
			<h1 class="page-title">Project</h1>
		</div>
		<div class="head">
			<form on:submit|preventDefault={handleSearch}>
				<input bind:value={searchQuery} placeholder="Name" />
				<select bind:value={searchCourse}>
					{#each Object.values(CourseType) as c}
						<option value={c}>
							{CourseTypeLabel[c]}
						</option>
					{/each}
				</select>
				<select bind:value={searchField}>
					{#each Object.values(ProjectFieldType) as f}
						<option value={f}>
							{ProjectFieldTypeLabel[f]}
						</option>
					{/each}
				</select>
				<Button type="submit" beforeIcon="search" style="outline" disabled={!isLoaded}>
					Search
				</Button>
			</form>
		</div>
		{#if isLoaded && !error}
			<div class="body">
				<ProjectList {projects} />
			</div>
		{:else if !isLoaded}
			<Spinner />
		{/if}
	</div>
	<div class="glow-left glow-purple" />
</main>

<style lang="css">
	form {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	form > :global(*) {
		margin: 0.25rem;
	}
</style>
