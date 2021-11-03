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
	import { onMount } from 'svelte';

	let projects: Project[];

	let searchQuery: string = $page.query.get('query') || '';
	let searchCourse: CourseType = ($page.query.get('course') || CourseType.PPL) as CourseType;
	let searchField: ProjectFieldType = ($page.query.get('field') || '') as ProjectFieldType;

	let isLoaded: boolean = false;
	let error: Error;

	const getProjects = async (query, course, field): Promise<Project[]> => {
		return await api.coursework.project.getAll(query, course, field);
	};

	const handleSearch = async () => {
		isLoaded = false;
		error = undefined;
		goto(
			`?${new URLSearchParams({ query: searchQuery, course: searchCourse, field: searchField })}`,
			{ replaceState: true, noscroll: true }
		);
		try {
			projects = await getProjects(searchQuery, searchCourse, searchField);
		} catch (e) {
			error = e;
		} finally {
			isLoaded = true;
		}
	};

	onMount(async () => {
		try {
			projects = await getProjects(searchQuery, searchCourse, searchField);
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
				<Button type="submit" beforeIcon="search" style="outline">Search</Button>
			</form>
		</div>
		{#if isLoaded && !error}
			<div class="body">
				<ProjectList {projects} />
			</div>
		{:else if error}
			<p>Failed loading projects!</p>
		{:else}
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
