<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	import UserIdInput from '../components/userIdInput.svelte';
	import StackOverflowCard from '../components/stackOverflowCard.svelte';
	import StackOverflowApi from '../services/stackOverflowApi';
	import PageButtons from '../components/pageButtons.svelte';
	import Page from '../page';
	import GitHubCard from '../components/gitHubCard.svelte';
	import GitHubApi from '../services/gitHubApi';

	type PageData =
		| { currentPage: Page.GitHub; profile: GitHubApi.Profile | undefined }
		| { currentPage: Page.StackOverflow; profile: StackOverflowApi.Profile | undefined };

	$: currentPage = getPageFromParams();

	// Update the url in case the page changes
	$: goto(currentPage);

	let inpVal: string | undefined = undefined;
	let pageData: PageData = { currentPage, profile: undefined };

	// Clear the data when the page changes
	$: if (currentPage) {
		pageData.profile = undefined;
		inpVal = undefined;
	}

	$: loadProfileFor(currentPage, inpVal);

	function getPageFromParams(): Page {
		return $page.params['page'] as Page;
	}

	async function loadProfileFor(currentPage: Page, inpVal: string | undefined) {
		inpVal = (inpVal ?? '').trim();
		if (inpVal.length === 0) return;

		if (currentPage === Page.GitHub) {
			pageData = { currentPage, profile: await GitHubApi.profileOf(inpVal) };
		} else if (currentPage === Page.StackOverflow) {
			pageData = { currentPage, profile: await StackOverflowApi.profileOf(inpVal) };
		}
	}
</script>

<PageButtons bind:page={currentPage} />

<UserIdInput page={currentPage} bind:value={inpVal} />

<div class="container">
	{#if pageData.profile !== undefined}
		{#if pageData.currentPage === Page.GitHub}
			<GitHubCard profile={pageData.profile} />
		{:else if pageData.currentPage === Page.StackOverflow}
			<StackOverflowCard profile={pageData.profile} />
		{/if}
	{/if}
</div>

<style lang="scss">
	@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,700;1,400&display=swap');

	:global {
		* {
			margin: 0;
			padding: 0;
			box-sizing: border-box;
		}

		:root {
			--accent: rgb(238, 16, 175);
			--accent-dark: rgb(63, 5, 47);
		}

		body {
			gap: 2rem;
			flex-direction: column;
			display: flex;
			color: white;
			background-color: black;
			align-items: center;
		}
	}

	.container {
		display: flex;
		justify-content: center;
		font-family: 'Lato', sans-serif;
	}
</style>
