<script lang="ts">
	import { goto } from '$app/navigation';
	import { assets } from '$app/paths';
	import { auth } from '$lib/auth';
	import Button from '$lib/components/Button.svelte';
	import Title from '$lib/components/Title.svelte';
	import { CourseType } from '$lib/constant';

	let isAuthenticated = auth.isAuthenticated();
</script>

<Title />
<main>
	<div class="content">
		<div class="image">
			<img src="{assets}/key-art.png" alt="Gallery Fasilkom UI" />
			<div class="glow-1" />
			<div class="glow-2" />
			<div class="glow-3" />
		</div>
		<div class="text">
			<h1 class="title">Gallery Karya Fasilkom UI</h1>
			<div class="glow-4" />
			<p class="description">
				PPL dan Propensi adalah contoh teks atau dummy dalam industri percetakan dan penataan huruf
				atau typesetting. Lorem Ipsum telah menjadi standar contoh teks sejak tahun 1500an.
			</p>
			<div class="navs">
				<Button onClick={() => goto(`/project/${CourseType.PPL}`)}>Lihat Proyek</Button>
				{#if $isAuthenticated}
					<Button onClick={() => auth.deauthenticate()} color="error">Logout</Button>
				{/if}
			</div>
		</div>
	</div>
</main>

<style lang="css">
	.content {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		height: 100vh;
	}

	.image {
		position: relative;
		height: auto;
		padding: 96px;
	}

	.image img {
		max-width: 100%;
		max-height: 100%;
	}

	.text {
		position: relative;
		height: auto;
		padding: 96px;
	}

	.text .title {
		font-size: 96px;
		font-weight: bold;
		margin-bottom: 2rem;
		filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.25));
	}

	.text .description {
		font-size: 18px;
		margin-bottom: 2rem;
	}

	.text .navs {
		position: absolute;
		display: flex;
	}

	.text .navs > :global(*) {
		margin-right: 16px;
	}

	.text .navs > :global(*):last-child {
		margin-right: 0;
	}

	.glow-4 {
		position: absolute;
		z-index: -1;
		width: 330px;
		height: 330px;
		left: 0px;
		top: 0px;
		border-radius: 330px;
		background: linear-gradient(180deg, #fc94d8 17.19%, rgba(248, 229, 158, 0) 100%);
		transform: rotate(-23.91deg);
	}

	@media (max-width: 1025px) {
		.content {
			flex-direction: column;
		}

		.image {
			display: none;
		}

		.text .title {
			font-size: 72px;
		}
	}

	@media (max-width: 768px) {
		.text {
			padding: 16px;
		}

		.text .title {
			font-size: 48px;
		}
	}

	@media (max-width: 320px) {
		.text .title {
			font-size: 32px;
		}

		.text .description {
			font-size: 16px;
		}
	}
</style>
