<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	import StackOverflowCard from '../components/stackOverflowCard.svelte';
	import StackOverflowApi from '../services/stackOverflowApi';
	import GitHubCard from '../components/gitHubCard.svelte';
	import GitHubApi from '../services/gitHubApi';
	import { debounce } from '../utils/debounce';

	enum Page {
		GitHub = 'gitHub',
		StackOverflow = 'stackOverflow'
	}

	type PageData =
		| { currentPage: Page.GitHub; profile: GitHubApi.Profile | undefined }
		| { currentPage: Page.StackOverflow; profile: StackOverflowApi.Profile | undefined };

	const debouncer = debounce(500);

	let inpVal: string | undefined = undefined;
	let pageData: PageData = { currentPage: $page.params['page'] as Page, profile: undefined };

	// Load the corresponding profile
	$: debouncer(inpVal, async () => {
		inpVal = (inpVal ?? '').trim();
		if (inpVal.length === 0) return;

		let currentPage = $page.params['page'];

		if (currentPage === Page.GitHub) {
			pageData = { currentPage, profile: await GitHubApi.profileOf(inpVal) };
		} else if (currentPage === Page.StackOverflow) {
			pageData = { currentPage, profile: await StackOverflowApi.profileOf(inpVal) };
		}
	});
</script>

<button on:click={() => goto(Page.GitHub)}>GitHub</button>
<button on:click={() => goto(Page.StackOverflow)}>Stack Overflow</button>

<input bind:value={inpVal} />

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
	.container {
		display: flex;
		justify-content: center;
		font-family: 'Lato', sans-serif;
	}
</style>
