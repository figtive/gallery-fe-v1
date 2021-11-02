<script lang="ts">
	import type { Blog } from '$lib/dtos';
	import BlogItem from './BlogItem.svelte';

	export let blogs: Blog[];
	export let allowBookmark: boolean = false;
</script>

<div class="list">
	{#each blogs as blog (blog.id)}
		<BlogItem {blog} {allowBookmark} />
	{/each}
</div>

<style lang="css">
	.list {
		display: flex;
		flex-wrap: wrap;
	}

	.list > :global(*) {
		border-bottom: 1px solid #cccc;
	}

	.list > :global(*):last-child {
		border-bottom: none;
	}
</style>
