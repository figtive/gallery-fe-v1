<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Title from '$lib/components/Title.svelte';
	import { BlogCategoryType, BlogCategoryTypeLabel } from '$lib/constant';
	import type { Blog } from '$lib/dtos';

	let blogs: Blog[] = [
		{
			id: 'uuid1',
			title: 'タイトル',
			category: BlogCategoryType.Agile,
			createdAt: '2021-11-02T11:27:03.709Z'
		}
	];

	let queryString: string = '';
	let queryCategory: BlogCategoryType;
	const handleQuery = () => {
		console.log(queryString, queryCategory);
	};
</script>

<Title title="Blog" />
<main>
	<div class="container">
		<div class="head">
			<h1 class="page-title">Blog</h1>
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
				{#each blogs as blog (blog.id)}{/each}
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
		margin: 0 -2rem;
	}

	.list > :global(*) {
		margin: 2rem;
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
