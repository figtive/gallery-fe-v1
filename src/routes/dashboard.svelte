<script lang="ts">
	import { auth } from '$lib/auth';
	import BlogItem from '$lib/components/BlogItem.svelte';
	import Title from '$lib/components/Title.svelte';
	import { blogs } from '$lib/dummy';

	let name = auth.getUserInfo().given_name;
</script>

<Title title="Dashboard" />
<main>
	<div class="container">
		<div class="head">
			<h1 class="page-title">Hi{name && ', '}{name}!</h1>
		</div>
		<div class="body">
			<div class="list">
				{#each blogs as blog (blog.id)}
					<BlogItem {blog} />
				{/each}
			</div>
		</div>
		<div class="glow-1" />
	</div>
</main>

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
