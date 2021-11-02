<script lang="ts">
	import BlogItem from '$lib/components/BlogItem.svelte';
	import Button from '$lib/components/Button.svelte';
	import Title from '$lib/components/Title.svelte';
	import { BlogCategoryType, BlogCategoryTypeLabel } from '$lib/constant';
	import { blogs } from '$lib/dummy';

	let queryString: string = '';
	let queryCategory: BlogCategoryType;
	const handleQuery = () => {
		console.log(queryString, queryCategory);
	};
</script>

<Title title="Bookmarks" />
<main>
	<div class="container">
		<div class="head">
			<h1 class="page-title">Bookmarked Blogs</h1>
		</div>
		<div class="head">
			<form on:submit|preventDefault={handleQuery}>
				<input bind:value={queryString} placeholder="Title" />
				<select bind:value={queryCategory}>
					{#each Object.values(BlogCategoryType) as c}
						<option value={c}>
							{BlogCategoryTypeLabel[c]}
						</option>
					{/each}
				</select>
				<Button type="submit">Search</Button>
			</form>
		</div>
		<div class="body">
			<div class="list">
				{#each blogs as blog (blog.id)}
					<BlogItem {blog} />
				{/each}
			</div>
		</div>
	</div>
	<div class="glow-1" />
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
