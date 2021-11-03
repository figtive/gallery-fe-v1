<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import ProjectList from '$lib/components/ProjectList.svelte';
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
				<Button type="submit" beforeIcon="search" style="outline">Search</Button>
			</form>
		</div>
		<div class="body">
			<ProjectList {projects} />
		</div>
	</div>
	<div class="glow-left glow-purple" />
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
