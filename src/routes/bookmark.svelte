<script lang="ts">
	import { onMount } from 'svelte';
	import api from '$lib/api';
	import { requireAuth } from '$lib/auth';
	import BlogList from '$lib/components/BlogList.svelte';
	import Title from '$lib/components/Title.svelte';
	import type { Blog } from '$lib/dtos';
	import { notify } from '$lib/notification';
	import Spinner from '$lib/components/Spinner.svelte';
	import { CourseType, CourseTypeLabel } from '$lib/constant';

	let blogs: Blog[];

	let isLoaded = false;
	let error: Error;
	let errorNotification: number;

	const getBlogs = async (): Promise<Blog[]> => {
		return await api.bookmark.getBlog();
	};

	onMount(async () => {
		try {
			blogs = await getBlogs();
		} catch (e) {
			console.error(e);
			errorNotification = notify({
				message: 'Failed to load bookmarks!',
				type: 'error',
				autoClose: false
			});
			error = e;
		} finally {
			isLoaded = true;
		}
	});

	requireAuth();
</script>

<Title title="Bookmarks" />
<main>
	<div class="container">
		<div class="head">
			<h1 class="page-title">Bookmarked Blogs</h1>
		</div>
		{#if isLoaded && !error}
			<div class="body">
				{#if blogs.length}
					<BlogList {blogs} />
				{:else}
					<div class="empty">
						<p>You haven't bookmarked any blogs from {CourseTypeLabel[CourseType.PPL]} yet.</p>
					</div>
				{/if}
			</div>
		{:else if !isLoaded}
			<Spinner />
		{/if}
	</div>
	<div class="glow-right glow-purple" />
</main>
