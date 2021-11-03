<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import api from '$lib/api';
	import BlogList from '$lib/components/BlogList.svelte';
	import Button from '$lib/components/Button.svelte';
	import Title from '$lib/components/Title.svelte';
	import { BlogCategoryType, BlogCategoryTypeLabel } from '$lib/constant';
	import type { Blog } from '$lib/dtos';
	import Spinner from '$lib/components/Spinner.svelte';

	let blogs: Blog[];

	let searchQuery: string = $page.query.get('query') || '';
	let searchCategory: BlogCategoryType = ($page.query.get('category') || '') as BlogCategoryType;

	let isLoaded: boolean = false;
	let error: Error;

	const getBlogs = async (query, category): Promise<Blog[]> => {
		return await api.coursework.blog.getAll(query, category);
	};

	const handleSearch = async () => {
		isLoaded = false;
		error = undefined;
		goto(
			`?${new URLSearchParams({
				query: searchQuery,
				category: searchCategory
			})}`,
			{ replaceState: true, noscroll: true }
		);
		try {
			blogs = await getBlogs(searchQuery, searchCategory);
		} catch (e) {
			error = e;
		} finally {
			isLoaded = true;
		}
	};

	onMount(async () => {
		try {
			blogs = await getBlogs(searchQuery, searchCategory);
		} catch (e) {
			console.error(e);
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
				<input bind:value={searchQuery} placeholder="Title" />
				<select bind:value={searchCategory}>
					{#each Object.values(BlogCategoryType) as c}
						<option value={c}>
							{BlogCategoryTypeLabel[c]}
						</option>
					{/each}
				</select>
				<Button type="submit" beforeIcon="search" style="outline">Search</Button>
			</form>
		</div>
		{#if isLoaded && !error}
			<div class="body">
				<BlogList {blogs} allowBookmark />
			</div>
		{:else if error}
			<p>Failed loading blogs!</p>
		{:else}
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
