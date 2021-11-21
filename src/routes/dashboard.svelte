<script lang="ts">
	import { auth, requireAuth } from '$lib/auth';
	import BlogList from '$lib/components/BlogList.svelte';
	import CourseworkTab from '$lib/components/CourseworkTab.svelte';
	import ProjectList from '$lib/components/ProjectList.svelte';
	import Tag from '$lib/components/Tag.svelte';
	import Title from '$lib/components/Title.svelte';
	import { CourseType, CourseTypeLabel } from '$lib/constant';
	import { blogs, projects } from '$lib/dummy';
	import { aggregatedVoteQuota } from '$lib/store';

	let name = auth.getUserInfo().given_name;

	requireAuth();
</script>

<Title title="Dashboard" />
<main>
	<div class="container">
		<div class="head">
			<h1 class="page-title">Hi{name && ', '}{name}!</h1>
		</div>
		<div class="body">
			<h2>Remaining Votes</h2>
			<div class="vote-list">
				<div class="vote-group">
					<h3>{CourseTypeLabel[CourseType.PPL]}</h3>
					<div class="vote-count">
						<p>Project</p>
						<Tag color={$aggregatedVoteQuota[CourseType.PPL].projects > 0 ? 'success' : 'error'}>
							{$aggregatedVoteQuota[CourseType.PPL].projects}
						</Tag>
					</div>
					<div class="vote-count">
						<p>Blog</p>
						<Tag color={$aggregatedVoteQuota[CourseType.PPL].blogs > 0 ? 'success' : 'error'}>
							{$aggregatedVoteQuota[CourseType.PPL].blogs}
						</Tag>
					</div>
				</div>
				<div class="vote-group">
					<h3>{CourseTypeLabel[CourseType.Propensi]}</h3>
					<div class="vote-count">
						<p>Project</p>
						<Tag
							color={$aggregatedVoteQuota[CourseType.Propensi].projects > 0 ? 'success' : 'error'}
						>
							{$aggregatedVoteQuota[CourseType.Propensi].projects}
						</Tag>
					</div>
					<div class="vote-count">
						<p>Blog</p>
						<Tag color={$aggregatedVoteQuota[CourseType.Propensi].blogs > 0 ? 'success' : 'error'}>
							{$aggregatedVoteQuota[CourseType.Propensi].blogs}
						</Tag>
					</div>
				</div>
			</div>
			<h2>My Votes</h2>
			<CourseworkTab>
				<ProjectList slot="project" {projects} />
				<BlogList slot="blog" {blogs} />
			</CourseworkTab>
		</div>
		<div class="glow-left glow-yellow" />
	</div>
</main>

<style lang="css">
	h2 {
		margin-top: 0;
		margin-bottom: 1rem;
	}

	.vote-list {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-bottom: 2rem;
	}

	.vote-group {
		display: flex;
		align-items: center;
		padding: 1rem 1.25rem;
		border: 2px solid #ddd;
		border-radius: 32px;
		margin-right: 1rem;
	}

	.vote-group:last-child {
		margin-right: 0;
	}

	.vote-group > h3 {
		margin-right: 1rem;
	}

	.vote-count {
		display: flex;
		flex-direction: row;
		margin-right: 1rem;
	}

	.vote-count:last-child {
		margin-right: 0;
	}

	.vote-count > p {
		margin-right: 4px;
		font-weight: 600;
	}
</style>
