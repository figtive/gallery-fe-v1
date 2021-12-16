<script lang="ts">
	import type { Blog, Project } from '$lib/dtos';

	export let coursework: Blog | Project;
	export let position: number;

	const title = (coursework as Blog).title || (coursework as Project).name;
	const name = (coursework as Blog).author || (coursework as Project).team;
</script>

<div class="row">
	<div class="position">
		<h1>{position}#</h1>
	</div>
	<div class="content">
		<p class="title">
			{title}
		</p>
		<p class="author">{name}</p>
	</div>
</div>

<style>
	.row {
		display: flex;
		flex-direction: row;
		padding: 2rem;
		border-radius: 1.5rem;
		overflow: hidden;
		box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
		transition: box-shadow 0.2s ease-in-out;
		background-color: #fff;
	}

	.row .position {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1.5rem;
		margin-right: 2rem;
	}

	.row .content {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.row .content .title {
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: 4px;
		cursor: pointer;
	}

	.row .content .author {
		color: var(--color-text-secondary);
	}

	@media (max-width: 1025px) {
	}

	@media (max-width: 768px) {
		.row .position {
			font-size: 1rem;
			margin-right: 1rem;
		}
	}

	@media (max-width: 320px) {
	}
</style>
