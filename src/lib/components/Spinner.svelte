<div class="wrapper">
	<div class="spinner part-1" />
	<div class="spinner part-2" />
	<div class="spinner part-3" />
	<div class="spinner part-4" />
</div>

<style lang="css">
	.wrapper {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 32px;
	}

	.spinner {
		position: absolute;
		width: 32px;
		height: 6px;
		background-color: #615cc180;
		border-radius: 4px;
	}

	.part-1 {
		animation: spin 1s 0s infinite ease;
	}

	.part-2 {
		animation: spin 1s 0.1s infinite ease;
	}

	.part-3 {
		animation: spin 1s 0.2s infinite ease;
	}

	.part-4 {
		animation: spin 1s 0.3s infinite ease;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		90% {
			transform: rotate(180deg);
		}
		100% {
			transform: rotate(180deg);
		}
	}
</style>
