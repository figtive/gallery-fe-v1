<script lang="ts">
	import { page } from '$app/stores';
	import { slide } from 'svelte/transition';
	import { auth } from '$lib/auth';
	import { aggregatedVoteQuota, currentCourseType } from '$lib/store';
	import BannerItem from './BannerItem.svelte';
	import { notificationItems, unNotify } from '$lib/notification';
	import { CourseType, CourseTypeLabel } from '$lib/constant';

	let isAuthenticated = auth.isAuthenticated();

	page.subscribe(() => {
		$notificationItems.forEach((item) => {
			unNotify(item.key);
		});
	});
</script>

<div class="list">
	{#if $isAuthenticated}
		{#if $page.path.includes('/project') && $aggregatedVoteQuota[$currentCourseType].projects > 0}
			<div transition:slide>
				<BannerItem color="success">
					You have {$aggregatedVoteQuota[$currentCourseType].projects}
					{CourseTypeLabel[$currentCourseType]} project vote{$aggregatedVoteQuota[
						$currentCourseType
					].projects > 1
						? 's'
						: ''} remaining!
				</BannerItem>
			</div>
		{/if}
		{#if $page.path.includes('/blog') && $aggregatedVoteQuota[$currentCourseType].blogs > 0}
			<div transition:slide>
				<BannerItem color="success">
					You have {$aggregatedVoteQuota[$currentCourseType].blogs}
					{CourseTypeLabel[$currentCourseType]} blog vote{$aggregatedVoteQuota[$currentCourseType]
						.blogs > 1
						? 's'
						: ''} remaining!
				</BannerItem>
			</div>
		{/if}
	{/if}
	<div transition:slide>
		{#each $notificationItems as item}
			<div transition:slide>
				<BannerItem color={item.type}>
					{item.message}
				</BannerItem>
			</div>
		{/each}
	</div>
</div>

<style lang="css">
	.list {
		position: absolute;
		display: flex;
		flex-direction: column;
		width: 100%;
		z-index: 2;
	}
</style>
