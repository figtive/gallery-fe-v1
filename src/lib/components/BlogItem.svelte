<script lang="ts">
	import api from '$lib/api';
	import { auth } from '$lib/auth';
	import { BlogCategoryTypeLabel, CourseType } from '$lib/constant';
	import type { Blog } from '$lib/dtos';
	import { aggregatedVoteQuota } from '$lib/store';
	import Button from './Button.svelte';
	import Tag from './Tag.svelte';

	let isAuthenticated = auth.isAuthenticated();

	export let allowBookmark = false;
	export let blog: Blog;

	let isVoted: boolean = undefined;
	let isBookmarked: boolean = undefined;

	const handleVote = () => {
		api.vote
			.cast(blog.id, !isVoted)
			.then(() => {
				isVoted = !isVoted;
				api.vote
					.getQuota()
					.then((quota) => {
						aggregatedVoteQuota.set(quota);
					})
					.catch((e) => {
						console.error(e);
					});
			})
			.catch((e) => {
				console.error(e);
			});
	};

	const handleBookmark = () => {
		api.bookmark
			.mark(blog.id, !isBookmarked)
			.then(() => {
				isBookmarked = !isBookmarked;
			})
			.catch((e) => {
				console.error(e);
			});
	};

	$: if ($isAuthenticated) {
		api.vote
			.getStatus(blog.id)
			.then((status) => {
				isVoted = status;
			})
			.catch((e) => {
				console.error(e);
			});
		api.bookmark
			.getStatus(blog.id)
			.then((status) => {
				isBookmarked = status;
			})
			.catch((e) => {
				console.error(e);
			});
	}
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
					disabled={!isVoted && $aggregatedVoteQuota[CourseType.PPL].blogs <= 0}
					color={isVoted ? 'error' : 'success'}
					onClick={handleVote}
				>
					{isVoted ? 'Unvote' : 'Vote'}
				</Button>
			{/if}
			{#if allowBookmark}
				{#if isBookmarked !== undefined}
					<button class="bookmark" on:click={handleBookmark} tabindex="0">
						<span class="material-icons">{isBookmarked ? 'bookmark' : 'bookmark_border'}</span>
					</button>
				{/if}
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
		user-select: none;
		-moz-user-select: none;
		-webkit-user-select: none;
	}
</style>
