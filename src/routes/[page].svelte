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

	$: currentPage = $page.params['page'];

	// Clear the data when the page changes
	$: if (currentPage) {
		pageData.profile = undefined;
		inpVal = undefined;
	};

	// Load the corresponding profile
	$: debouncer(inpVal, async () => {
		inpVal = (inpVal ?? '').trim();
		if (inpVal.length === 0) return;

		if (currentPage === Page.GitHub) {
			pageData = { currentPage, profile: await GitHubApi.profileOf(inpVal) };
		} else if (currentPage === Page.StackOverflow) {
			pageData = { currentPage, profile: await StackOverflowApi.profileOf(inpVal) };
		}
	});
</script>

<div class="pageButtons">
	<button class:selected={currentPage === Page.GitHub} on:click={() => goto(Page.GitHub)}
		>GitHub</button
	><button
		class:selected={currentPage === Page.StackOverflow}
		on:click={() => goto(Page.StackOverflow)}>Stack Overflow</button
	>
</div>

<input
	bind:value={inpVal}
	placeholder={currentPage === Page.GitHub ? 'Enter GitHub username' : 'Enter Stack Overflow ID'}
/>

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

		input {
			background-color: black;
			color: white;
			border: none;
			font-size: 24pt;
			border: 0.3rem solid var(--accent);
			border-radius: 0.3rem;
		}
	}

	.pageButtons {
		border: 0.3rem solid var(--accent);
		border-radius: 0.3rem;
		display: flex;

		button {
			flex: 1;
			border: none;
			background: none;
			color: var(--accent);
			font-size: 20pt;

			&:hover {
				background-color: var(--accent-dark);
			}

			&.selected {
				color: white;
				background-color: var(--accent);
			}
		}
	}

	.container {
		display: flex;
		justify-content: center;
		font-family: 'Lato', sans-serif;
	}
</style>
