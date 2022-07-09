<script lang="ts">
	export let bg = '';
</script>

<div style="--bg:{bg}">
	<slot />
</div>

<style lang="scss">
	div {
		background: var(--bg, rgb(44, 44, 44));
		font-size: 14pt;
		width: 14rem;
		display: flex;
		justify-content: space-between;
		color: rgb(223, 223, 223);
		padding: 0.5rem;
		border-radius: 0.5rem;
	}
</style>
