<script lang="ts">
	import { debounce } from '../utils/debounce';
	import Page from '../page';

	export let value: string;
	export let page: Page;

	$: placeholder = placeholderFor(page);

	// Only emit a value change once the input hasn't changed for the specified
	// debounce timeout.
	const debouncer = debounce<string>(500);
	const valueChanged = (event: { currentTarget: HTMLInputElement }) =>
		debouncer(event.currentTarget.value, (inpVal) => (value = inpVal));

	function placeholderFor(page: Page): string {
		switch (page) {
			case Page.GitHub:
				return 'Enter GitHub username';
			case Page.StackOverflow:
				return 'Enter Stack Overflow ID';
		}
	}
</script>

<input {value} {placeholder} on:input={valueChanged} />

<style lang="scss">
	input {
		font-size: 24pt;
	}
</style>
