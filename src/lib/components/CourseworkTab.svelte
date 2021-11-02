<script lang="ts">
	let active: 'project' | 'blog' = 'project';
</script>

<div class="bar">
	<button data-active={active === 'project'} on:click={() => (active = 'project')}>Project</button>
	<button data-active={active === 'blog'} on:click={() => (active = 'blog')}>Blog</button>
</div>

{#if active === 'project'}
	<slot name="project" />
{/if}
{#if active === 'blog'}
	<slot name="blog" />
{/if}

<style lang="css">
	.bar {
		display: flex;
		margin-bottom: 2rem;
	}

	.bar > :global(*) {
		margin-right: 20px;
	}

	.bar > :global(*):last-child {
		margin-right: 0;
	}

	button {
		position: relative;
		font-weight: 600;
		z-index: 1;
		border: none;
		background: none;
		font-size: 1.2rem;
		font-family: 'Open Sans', sans-serif;
		padding: 0;
	}

	button[data-active='true']::before,
	button:hover::before {
		content: ' ';
		display: block;
		position: absolute;
		bottom: -0.2rem;
		width: 100%;
		height: 4px;
		background: #85b4fb;
		z-index: -1;
	}
</style>
