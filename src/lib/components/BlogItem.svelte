<script lang="ts">
	import { BlogCategoryTypeLabel } from '$lib/constant';
	import type { Blog } from '$lib/dtos';
	import Tag from './Tag.svelte';

	export let blog: Blog;
	export let onClick: () => void = () => {
		/* noop */
	};
	export let allowBookmark = false;

	const bookmark: () => void = () => console.log(blog.id);
</script>

<div class="row">
	<div class="content">
		<p
			class="title"
			on:click={onClick}
			on:keydown={(e) => e.key === 'Enter' && onClick()}
			tabindex="0"
		>
			{blog.title}
		</p>
		<p class="author">by {blog.author}</p>
		<div class="tags">
			<Tag color="secondary">{new Date(blog.createdAt).getFullYear()}</Tag>
			<Tag color="info">{BlogCategoryTypeLabel[blog.category]}</Tag>
		</div>
	</div>
	<div class="action">
		{#if allowBookmark}
			<button class="bookmark" on:click={bookmark} tabindex="0">
				<span class="material-icons">bookmark_border</span>
			</button>
		{/if}
	</div>
</div>

<style>
	.row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
		padding: 1.2rem;
	}

	.row .content {
		display: flex;
		flex-direction: column;
	}

	.row .content .title {
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: 4px;
		cursor: pointer;
	}

	.row .content .author {
		margin-bottom: 12px;
		color: var(--color-text-secondary);
	}

	.row .content .tags {
		display: flex;
		flex-wrap: wrap;
		margin: -4px -4px;
	}

	.row .content .tags > :global(*) {
		margin: 4px;
	}

	.row .action {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.row .action .bookmark {
		border: none;
		background: none;
		width: 3rem;
		height: 3rem;
		border-radius: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: all 0.1s ease-in-out;
		cursor: pointer;
	}

	.row .action .bookmark:hover,
	.row .action .bookmark:focus {
		background-color: #8882;
	}

	.row .action .bookmark:active {
		background-color: #4442;
	}

	.row .action .bookmark > span {
		font-size: 1.5rem;
		-moz-user-select: none;
		-webkit-user-select: none;
	}
</style>
