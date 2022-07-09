<script lang="ts">
	import Page from '../page';

	export let page: Page;
</script>

<div class="pageButtons">
	<button class:selected={page === Page.GitHub} on:click={() => (page = Page.GitHub)}>GitHub</button
	><button class:selected={page === Page.StackOverflow} on:click={() => (page = Page.StackOverflow)}
		>Stack Overflow</button
	>
</div>

<style lang="scss">
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
</style>
