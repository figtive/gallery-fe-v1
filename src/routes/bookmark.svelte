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
	<div class="glow-1" />
</main>

<style lang="css">
	.glow-1 {
		position: fixed;
		z-index: -1;
		width: 80vh;
		height: 80vh;
		bottom: 0;
		right: 0;
		border-radius: 100%;
		background: #f9eab3;
		filter: blur(20vh);
		transform: translate(50%, 50%);
	}
</style>
