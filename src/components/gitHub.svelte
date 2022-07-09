<script lang="ts">
	import { NotFound } from '../services/errors';
	import GitHubApi from '../services/gitHubApi';
	import { debounce } from '../utils/debounce';
	import GitHubCard from './gitHubCard.svelte';

	let usrNameDebouncer = debounce<string | undefined>(500);
	let profile: GitHubApi.Profile | undefined;
	let profileNotFound = false;

	let usrName: string | undefined;
	$: usrNameDebouncer(usrName, async (usrName) => {
		usrName = usrName ?? '';
		if (usrName.trim().length === 0) return;

		try {
			profile = await GitHubApi.profileOf(usrName);
			profileNotFound = false;
		} catch (e: unknown) {
			if (!(e instanceof NotFound)) {
				throw e;
			}

			profile = undefined;
			profileNotFound = true;
		}
	});
</script>

{#if profileNotFound}
	<marquee>Profile &quot;{usrName}&quot; not found</marquee>
{/if}

<input type="text" bind:value={usrName} />

{#if profile !== undefined}
	<GitHubCard {profile} />
{/if}
