<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { browser } from '$app/env';

	import CardStyleInput from '../components/cardStyleInput.svelte';
	import DownloadCard from '../components/downloadCard.svelte';
	import GitHubApi from '../services/gitHubApi';
	import GitHubCard from '../components/gitHubCard.svelte';
	import Page from '../page';
	import PageButtons from '../components/pageButtons.svelte';
	import randomAccentStore from '../services/randomAccentStore';
	import StackOverflowApi from '../services/stackOverflowApi';
	import StackOverflowCard from '../components/stackOverflowCard.svelte';
	import type CardStyle from '../cardStyle';
	import UserIdInput from '../components/userIdInput.svelte';

	type PageData =
		| { currentPage: Page.GitHub; profile: GitHubApi.Profile | undefined }
		| { currentPage: Page.StackOverflow; profile: StackOverflowApi.Profile | undefined };

	$: currentPage = getPageFromParams();

	// Update the url in case the page changes
	$: browser && goto(currentPage);

	let inpVal = '';
	let pageData: PageData = { currentPage, profile: undefined };
	let cardRef: HTMLElement | undefined = undefined;

	// Clear the user ID input when the page changes
	$: currentPage, (inpVal = '');

	$: loadProfileFor(currentPage, inpVal);

	let style: CardStyle = {
		avatarSize: 100,
		backgroundColor: '#1d1d1d',
		borderRadius: 10,
		color: '#d8d8d8',
		linkColor: '#2243b3',
		roundAvatar: true,
		width: 300
	};
	$: style = style;

	function getPageFromParams(): Page {
		return $page.params['page'] as Page;
	}

	async function loadProfileFor(currentPage: Page, inpVal: string | undefined) {
		inpVal = (inpVal ?? '').trim();
		if (inpVal.length === 0) {
			pageData.profile = undefined;
			return;
		}

		if (currentPage === Page.GitHub) {
			pageData = { currentPage, profile: await GitHubApi.profileOf(inpVal) };
		} else if (currentPage === Page.StackOverflow) {
			pageData = { currentPage, profile: await StackOverflowApi.profileOf(inpVal) };
		}
	}
</script>

<main
	style:--accent={$randomAccentStore.accent}
	style:--accent-dark={$randomAccentStore.accentDark}
>
	<PageButtons bind:page={currentPage} />
	<CardStyleInput bind:style />
	<UserIdInput page={currentPage} bind:value={inpVal} />

	{#if pageData.profile !== undefined}
		<h1>Preview</h1>
		<div bind:this={cardRef}>
			{#if pageData.currentPage === Page.GitHub}
				<GitHubCard {style} profile={pageData.profile} />
			{:else if pageData.currentPage === Page.StackOverflow}
				<StackOverflowCard {style} profile={pageData.profile} />
			{/if}
		</div>
	{/if}

	{#if cardRef !== undefined}
		<h1>Image</h1>
		<DownloadCard {cardRef} />
	{/if}
</main>

<style lang="scss">
	:global body {
		background-color: black;
		color: white;
	}

	main {
		gap: 2rem;
		flex-direction: column;
		display: flex;
		align-items: center;
	}
</style>
