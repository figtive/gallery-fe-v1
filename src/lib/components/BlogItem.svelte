<script lang="ts">
	import { auth } from '$lib/auth';
	import { BlogCategoryTypeLabel } from '$lib/constant';
	import type { Blog } from '$lib/dtos';
	import Button from './Button.svelte';
	import Tag from './Tag.svelte';

	let isAuthenticated = auth.isAuthenticated();

	export let allowBookmark = false;
	export let blog: Blog;

	let isVoted: boolean = undefined;

	const handleVote = () => {
		// TODO: impl vote
		isVoted = !isVoted;
	};

	$: if ($isAuthenticated) {
		//TODO: fetch vote status
		setTimeout(() => {
			isVoted = false;
		}, 1000);
	}

	const bookmark: () => void = () => console.log(blog.id);
	console.log(blog.category);
	console.log(BlogCategoryTypeLabel[blog.category]);
	console.log(BlogCategoryTypeLabel);
</script>

<div class="row">
	<div class="content">
		<a href="https://figtive.dev" target="_blank" rel="noopener noreferrer">
			<p class="title">
				{blog.title}
			</p>
		</a>
		<p class="author">by {blog.author}</p>
		<div class="tags">
			<Tag color="secondary">{new Date(blog.createdAt).getFullYear()}</Tag>
			<Tag color="info">
				{BlogCategoryTypeLabel[blog.category] ||
					blog.category.charAt(0).toUpperCase() + blog.category.slice(1)}
			</Tag>
		</div>
	</div>
	<div class="actions">
		{#if $isAuthenticated}
			{#if isVoted !== undefined}
				<Button
					beforeIcon="how_to_vote"
					style="outline"
					color={isVoted ? 'error' : 'success'}
					onClick={handleVote}
				>
					{isVoted ? 'Unvote' : 'Vote'}
				</Button>
			{/if}
			{#if allowBookmark}
				<button class="bookmark" on:click={bookmark} tabindex="0">
					<span class="material-icons">bookmark_border</span>
				</button>
			{/if}
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

	.content {
		display: flex;
		flex-direction: column;
	}

	.title {
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: 4px;
		cursor: pointer;
	}

	.author {
		margin-bottom: 12px;
		color: var(--color-text-secondary);
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		margin: -4px -4px;
	}

	.tags > :global(*) {
		margin: 4px;
	}

	.actions {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.actions > :global(*) {
		margin-right: 16px;
	}

	.actions > :global(*):last-child {
		margin-right: 0;
	}

	.bookmark {
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

	.bookmark:hover,
	.bookmark:focus {
		background-color: #8882;
	}

	.bookmark:active {
		background-color: #4442;
	}

	.bookmark > span {
		font-size: 1.5rem;
		-moz-user-select: none;
		-webkit-user-select: none;
	}
</style>
