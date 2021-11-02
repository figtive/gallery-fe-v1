<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import ProjectItem from '$lib/components/ProjectItem.svelte';
	import { ClassType, ClassTypeLabel, FieldType, FieldTypeLabel } from '$lib/constant';
	import type { Project } from '$lib/dtos';

	let projects: Project[] = [
		{
			id: 'uuid1',
			name: 'Test Project 1',
			team: 'Team 1',
			description: 'Desc 1',
			thumbnail: 'https://picsum.photos/seed/asd1/200/256',
			active: true,
			field: 'Social',
			createdAt: 1633788000000
		},
		{
			id: 'uuid2',
			name: 'Test Project 2',
			team: 'Team 2',
			description: 'Desc 2',
			thumbnail: 'https://picsum.photos/seed/asd2/200/256',
			active: false,
			field: 'E-commerce',
			createdAt: 1602252000000
		},
		{
			id: 'uuid3',
			name: 'Test Project 3',
			team: 'Team 3',
			description: 'Desc 3',
			thumbnail: 'https://picsum.photos/seed/asd3/200/256',
			active: true,
			field: 'Social',
			createdAt: 1633788000000
		},
		{
			id: 'uuid4',
			name: 'Test Project 4',
			team: 'Team 4',
			description: 'Desc 4',
			thumbnail: 'https://picsum.photos/seed/asd4/200/256',
			active: true,
			field: 'Social',
			createdAt: 1633788000000
		},
		{
			id: 'uuid5',
			name: 'Test Project 5',
			team: 'Team 4',
			description: 'Desc 4',
			thumbnail: 'https://picsum.photos/seed/asd5/200/256',
			active: false,
			field: 'E-commerce',
			createdAt: 1602252000000
		}
	];

	let queryString: string = '';
	let queryClass: ClassType;
	let queryField: FieldType;
	const handleQuery = () => {
		console.log(queryString, queryClass, queryField);
	};
</script>

<main>
	<div class="container">
		<div class="head">
			<h1 class="page-title">Product</h1>
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
					{#each Object.values(FieldType) as f}
						<option value={f}>
							{FieldTypeLabel[f]}
						</option>
					{/each}
				</select>
				<Button type="submit">Search</Button>
			</form>
		</div>
		<div class="body">
			<div class="list">
				{#each projects as project (project.id)}
					<ProjectItem {project} onClick={() => goto(`/product/${project.id}`)} />
				{/each}
			</div>
		</div>
	</div>
	<div class="glow-1" />
</main>

<style lang="css">
	form > * {
		margin-right: 0.5rem;
	}

	form > *:last-child {
		margin-right: 0;
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
