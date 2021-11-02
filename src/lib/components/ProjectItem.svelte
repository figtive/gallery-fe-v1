<script lang="ts">
	import type { Project } from '$lib/dtos';

	export let project: Project;
	export let onClick: () => void = () => {};
</script>

<div
	class="card"
	on:click={onClick}
	on:keydown={(e) => e.key === 'Enter' && onClick()}
	tabindex="0"
>
	<div class="image">
		<img src={project.thumbnail} alt={project.name} />
	</div>
	<div class="content">
		<p class="name">{project.name}</p>
		<p class="team">{project.team}</p>
	</div>
</div>

<style>
	* {
		/* border: 1px solid blue; */
	}
	.card {
		display: flex;
		flex-direction: column;
		width: 256px;
		height: 256px;
		padding: 0;
		border-radius: 0.5rem;
		overflow: hidden;
		cursor: pointer;
		box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.25);
		transition: box-shadow 0.2s ease-in-out;
	}

	.card:hover,
	.card:focus {
		box-shadow: 0 0.75rem 1.5rem rgba(0, 0, 0, 0.35);
	}

	.card .image {
		background-color: #eee;
		height: 60%;
		overflow: hidden;
	}

	.card .image img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center center;
	}

	.card .content {
		background-color: #fff;
		flex-grow: 1;
		padding: 0.5rem 0.75rem;
	}

	.card .content .name {
		font-size: 1.5rem;
		font-weight: 600;
	}
</style>
