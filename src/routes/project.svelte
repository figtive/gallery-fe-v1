<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import ProjectItem from '$lib/components/ProjectItem.svelte';
	import Title from '$lib/components/Title.svelte';
	import {
		ClassType,
		ClassTypeLabel,
		ProjectFieldType,
		ProjectFieldTypeLabel
	} from '$lib/constant';
	import { projects } from '$lib/dummy';

	let queryString: string = '';
	let queryClass: ClassType;
	let queryField: ProjectFieldType;
	const handleQuery = () => {
		console.log(queryString, queryClass, queryField);
	};
</script>

<Title title="Project" />
<main>
	<div class="container">
		<div class="head">
			<h1 class="page-title">Project</h1>
		</div>
		<div class="head">
			<form on:submit|preventDefault={handleQuery}>
				<input bind:value={queryString} placeholder="Name" />
				<select bind:value={queryClass}>
					{#each Object.values(ClassType) as c}
						<option value={c}>
							{ClassTypeLabel[c]}
						</option>
					{/each}
				</select>
				<select bind:value={queryField}>
					{#each Object.values(ProjectFieldType) as f}
						<option value={f}>
							{ProjectFieldTypeLabel[f]}
						</option>
					{/each}
				</select>
				<Button type="submit">Search</Button>
			</form>
		</div>
		<div class="body">
			<div class="list">
				{#each projects as project (project.id)}
					<ProjectItem {project} />
				{/each}
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
		margin: -2rem;
		justify-content: space-evenly;
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
		left: 0;
		border-radius: 100%;
		background: #bebbff;
		filter: blur(20vh);
		transform: translate(-50%, 50%);
	}
</style>
