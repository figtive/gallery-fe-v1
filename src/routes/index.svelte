<script lang="ts">
	import { goto } from '$app/navigation';
	import { assets } from '$app/paths';
	import { auth } from '$lib/auth';
	import Button from '$lib/components/Button.svelte';

	let isAuthenticated = auth.isAuthenticated();
</script>

<main>
	<div class="content">
		<div class="image">
			<img src="{assets}/key-art.png" alt="Gallery PPL" />
			<div class="background glow-1" />
			<div class="background glow-2" />
			<div class="background glow-3" />
		</div>
		<div class="text">
			<h1 class="title">Gallery Karya Fasilkom UI</h1>
			<div class="background glow-4" />
			<p class="description">
				PPL dan Propensi adalah contoh teks atau dummy dalam industri percetakan dan penataan huruf
				atau typesetting. Lorem Ipsum telah menjadi standar contoh teks sejak tahun 1500an.
			</p>
			<div class="navs">
				<Button onClick={() => goto('/produk')}>Produk PPL</Button>
				<Button color="secondary">Produk Propensi</Button>
			</div>
			<div class="auths">
				{#if $isAuthenticated}
					<Button onClick={() => auth.deauthenticate()} color="error">Logout</Button>
				{/if}
				<div id="google-signin" class={$isAuthenticated && 'hidden'} />
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
		width: 50%;
		height: auto;
		padding: 96px;
	}

	.image img {
		max-width: 100%;
	}

	.text {
		position: relative;
		width: 50%;
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
		margin-bottom: 2rem;
	}

	.text .navs > :global(*) {
		margin-right: 16px;
	}

	.text .navs > :global(*):last-child {
		margin-right: 0;
	}

	.text .auths {
		position: absolute;
		margin-bottom: 2rem;
	}

	.background {
		position: absolute;
		z-index: -1;
	}

	.glow-1 {
		width: 285px;
		height: 285px;
		left: 30%;
		top: 10%;
		border-radius: 285px 285px 0px 285px;
		background: linear-gradient(314.04deg, #a981ff 11.12%, #ffffff 100%);
		transform: rotate(41.48deg);
	}

	.glow-2 {
		width: 302px;
		height: 302px;
		left: 10%;
		top: 50%;
		background: #bebbff;
		filter: blur(120px);
	}

	.glow-3 {
		width: 287px;
		height: 287px;
		right: 10%;
		top: 50%;
		background: #f9eab3;
		filter: blur(120px);
	}

	.glow-4 {
		width: 330px;
		height: 330px;
		left: 0px;
		top: 0px;
		border-radius: 330px;
		background: linear-gradient(180deg, #fc94d8 17.19%, rgba(248, 229, 158, 0) 100%);
		transform: rotate(-23.91deg);
	}
</style>
