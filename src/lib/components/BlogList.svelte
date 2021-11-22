<script lang="ts">
	import type { Blog } from '$lib/dtos';
	import BlogItem from './BlogItem.svelte';

	export let blogs: Blog[];
	export let emptyMessage = '';
	export let allowBookmark = false;
</script>

<div class="list">
	{#if blogs.length}
		{#each blogs as blog (blog.id)}
			<BlogItem {blog} {allowBookmark} />
		{/each}
	{:else}
		<div class="empty">
			<p>{emptyMessage}</p>
		</div>
	{/if}
</div>

<style lang="css">
	.list {
		display: flex;
		flex-direction: column;
	}

	.list > :global(*) {
		border-bottom: 1px solid #cccc;
	}

	.list > :global(*):last-child {
		border-bottom: none;
	}

	.empty {
		margin-right: auto;
	}
</style>
