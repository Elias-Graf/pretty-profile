<script lang="ts">
	import type CardStyle from '../cardStyle';

	export let style: CardStyle;
</script>

<div
	style:background-color={style.backgroundColor}
	style:border-radius="{style.borderRadius}px"
	style:color={style.color}
	style:width="{style.width}px"
>
	<slot />
</div>

<style lang="scss">
	div {
		font-size: 14pt;
		width: 14rem;
		display: flex;
		justify-content: space-between;
		padding: 0.5rem;
	}
</style>
