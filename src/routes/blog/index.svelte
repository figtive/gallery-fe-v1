<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import api from '$lib/api';
	import BlogList from '$lib/components/BlogList.svelte';
	import Button from '$lib/components/Button.svelte';
	import Title from '$lib/components/Title.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import { BlogCategoryType, BlogCategoryTypeLabel, CourseType } from '$lib/constant';
	import type { Blog } from '$lib/dtos';
	import { notify, unNotify } from '$lib/notification';
	import { currentCourseType } from '$lib/store';
	import { shuffle } from '$lib/utils';

	let blogs: Blog[];

	let searchTitle: string = $page.query.get('title') || '';
	let searchCategory: BlogCategoryType = ($page.query.get('category') || '') as BlogCategoryType;

	let isLoaded = false;
	let error: Error;
	let errorNotification: number;

	const getBlogs = async (title, category): Promise<Blog[]> => {
		currentCourseType.set(CourseType.PPL);
		return shuffle(await api.coursework.blog.getAll(title, category));
	};

	const handleSearch = async () => {
		isLoaded = false;
		error = undefined;
		unNotify(errorNotification);
		goto(
			`?${new URLSearchParams({
				title: searchTitle,
				category: searchCategory
			})}`,
			{ replaceState: true, noscroll: true }
		);
		try {
			blogs = await getBlogs(searchTitle, searchCategory);
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
			blogs = await getBlogs(searchTitle, searchCategory);
			// TODO: refresh voteQuota
		} catch (e) {
			console.error(e);
			errorNotification = notify({
				message: 'Failed to load blogs!',
				type: 'error',
				autoClose: false
			});
			error = e;
		} finally {
			isLoaded = true;
		}
	});
</script>

<Title title="Blog" />
<main>
	<div class="container">
		<div class="head">
			<h1 class="page-title">Blog</h1>
		</div>
		<div class="head">
			<form on:submit|preventDefault={handleSearch}>
				<input bind:value={searchTitle} placeholder="Title" />
				<select bind:value={searchCategory}>
					{#each Object.values(BlogCategoryType) as c}
						<option value={c}>
							{BlogCategoryTypeLabel[c]}
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
				<BlogList {blogs} allowBookmark />
			</div>
		{:else if !isLoaded}
			<Spinner />
		{/if}
	</div>
	<div class="glow-right glow-yellow" />
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
