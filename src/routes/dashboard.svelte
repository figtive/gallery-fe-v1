<script lang="ts">
	import { auth } from '$lib/auth';
	import BlogList from '$lib/components/BlogList.svelte';
	import CourseworkTab from '$lib/components/CourseworkTab.svelte';
	import ProjectList from '$lib/components/ProjectList.svelte';
	import Tag from '$lib/components/Tag.svelte';
	import Title from '$lib/components/Title.svelte';
	import { blogs, projects } from '$lib/dummy';

	let name = auth.getUserInfo().given_name;
</script>

<Title title="Dashboard" />
<main>
	<div class="container">
		<div class="head">
			<h1 class="page-title">Hi{name && ', '}{name}!</h1>
		</div>
		<div class="body">
			<div class="vote">
				<h2>My Votes</h2>
				<div>
					<h2>Remaining Votes</h2>
					<div class="vote-group">
						<div class="vote-count">
							<p>Project</p>
							<Tag color="success">1</Tag>
						</div>
						<div class="vote-count">
							<p>Blog</p>
							<Tag color="success">1</Tag>
						</div>
					</div>
				</div>
			</div>
			<CourseworkTab>
				<ProjectList slot="project" {projects} />
				<BlogList slot="blog" {blogs} />
			</CourseworkTab>
		</div>
		<div class="glow-1" />
	</div>
</main>

<style lang="css">
	.vote {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-end;
		margin-bottom: 1rem;
		text-align: center;
	}

	.vote-group {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.vote-count {
		display: flex;
		flex-direction: row;
		margin: 0.5rem;
	}

	.vote-count > p {
		margin-right: 4px;
		font-weight: 600;
	}

	.glow-1 {
		position: fixed;
		z-index: -1;
		width: 80vh;
		height: 80vh;
		bottom: 0;
		left: 0;
		border-radius: 100%;
		background: #f9eab3;
		filter: blur(20vh);
		transform: translate(-50%, 50%);
	}
</style>
