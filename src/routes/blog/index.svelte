<script lang="ts">
	import BlogList from '$lib/components/BlogList.svelte';
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
				<Button type="submit" beforeIcon="search" style="outline">Search</Button>
			</form>
		</div>
		<div class="body">
			<BlogList {blogs} allowBookmark />
		</div>
	</div>
	<div class="glow-right glow-yellow" />
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
</style>
