<script lang="ts">
	import CourseworkTab from '$lib/components/CourseworkTab.svelte';
	import LeaderboardList from '$lib/components/LeaderboardList.svelte';
	import Title from '$lib/components/Title.svelte';
	import { blogs, projects } from '$lib/dummy';
</script>

<Title title="Leaderboard" />
<main>
	<div class="container">
		<div class="head">
			<h1 class="page-title">Leaderboard</h1>
		</div>
		<div class="body">
			<CourseworkTab>
				<LeaderboardList slot="project" courseworks={projects} />
				<LeaderboardList slot="blog" courseworks={blogs} />
			</CourseworkTab>
		</div>
	</div>
	<div class="glow-left glow-purple" />
	<div class="glow-right glow-yellow" />
</main>
