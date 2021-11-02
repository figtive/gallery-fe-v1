<script lang="ts">
	import BlogList from '$lib/components/BlogList.svelte';
	import Title from '$lib/components/Title.svelte';
	import { blogs } from '$lib/dummy';
</script>

<Title title="Bookmarks" />
<main>
	<div class="container">
		<div class="head">
			<h1 class="page-title">Bookmarked Blogs</h1>
		</div>
		<div class="body">
			<BlogList {blogs} />
		</div>
	</div>
	<div class="glow-right glow-purple" />
</main>
