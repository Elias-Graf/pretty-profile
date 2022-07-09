<script lang="ts">
	import { debounce } from '../utils/debounce';
	import Page from '../page';

	export let value: string | undefined;
	export let page: Page;

	let inpVal = value;

	$: placeholder = placeholderFor(page);

	// Only emit a value change once the input hasn't changed for the specified
	// debounce timeout.
	const debouncer = debounce(500);
	$: debouncer(inpVal, () => (value = inpVal));

	function placeholderFor(page: Page): string {
		switch (page) {
			case Page.GitHub:
				return 'Enter GitHub username';
			case Page.StackOverflow:
				return 'Enter Stack Overflow ID';
		}
	}
</script>

<input bind:value={inpVal} {placeholder} />

<style lang="scss">
	input {
		background-color: black;
		color: white;
		border: none;
		font-size: 24pt;
		border: 0.3rem solid var(--accent);
		border-radius: 0.3rem;
	}
</style>
