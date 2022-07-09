<script lang="ts">
	import html2Canvas from 'html2canvas';
	import { NotFound } from '../services/errors';
	import { debounce } from '../utils/debounce';
	import StackOverflowApi from '../services/stackOverflowApi';
	import StackOverflowCard from './stackOverflowCard.svelte';

	let idDebouncer = debounce<string | undefined>(500);
	let id: string | undefined = undefined;
	let profile: StackOverflowApi.Profile | undefined;
	let profileNotFound = false;

	$: idDebouncer(id, async (id) => {
		id = id ?? '';
		if (id.trim().length === 0) return;

		try {
			profile = await StackOverflowApi.profileOf(id);
			profileNotFound = false;
		} catch (e: unknown) {
			if (!(e instanceof NotFound)) {
				throw e;
			}

			profile = undefined;
			profileNotFound = true;
		}
	});

	function toCanvas() {
		html2Canvas(document.getElementById('preview')!, {
			allowTaint: true,
			scale: 2,
			backgroundColor: 'transparent'
		}).then((canvas) => {
			document.body.append(canvas);
		});
	}
</script>

<input bind:value={id} placeholder="Stack Overflow ID" />

<div class="container">
	{#if profileNotFound}
		<marquee>Profile &quot;{id}&quot; not found</marquee>
	{/if}
	{#if profile}
		<StackOverflowCard {profile} />
	{/if}
</div>
<button on:click={toCanvas}>Download</button>

<style lang="scss">
	.container {
		display: flex;
		justify-content: center;
		font-family: 'Lato', sans-serif;
	}
</style>
