<script lang="ts">
	import Title from '$lib/components/Title.svelte';
	import type { Blog } from '$lib/dtos';

	let blogs: Blog[] = [];
</script>

<Title title="Blog" />
<main>
	<div class="container">
		<div class="head">
			<h1 class="page-title">Blog</h1>
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
