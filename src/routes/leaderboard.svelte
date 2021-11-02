<script lang="ts">
	import Title from '$lib/components/Title.svelte';
</script>

<Title title="Leaderboard" />
<main>
	<div class="container">
		<div class="head">
			<h1 class="page-title">Leaderboard</h1>
		</div>
		<div class="body">
			<div class="list" />
		</div>
	</div>
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
</style>
