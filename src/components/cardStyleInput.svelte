<script lang="ts">
	import type CardStyle from '../cardStyle';

	export let style: CardStyle;
</script>

<div class="inputs">
	<label for="width">Width:</label>
	<input id="width" type="number" min="0" bind:value={style.width} />
	<label for="borderRadius">Border radius:</label>
	<input id="borderRadius" type="number" min="0" bind:value={style.borderRadius} />
	<label for="avatarSize">Avatar size:</label>
	<input id="avatarSize" type="number" bind:value={style.avatarSize} />
	<label for="roundAvatar">Round avatar:</label>
	<input id="roundAvatar" type="checkbox" bind:checked={style.roundAvatar} />
	<label for="backgroundColor">Background color:</label>
	<input id="backgroundColor" type="color" bind:value={style.backgroundColor} />
	<label for="color">Text color:</label>
	<input id="color" type="color" bind:value={style.color} />
	<label for="linkColor">Link color</label>
	<input id="linkColor" type="color" bind:value={style.linkColor} />
</div>

<style lang="scss">
	.inputs {
		display: grid;
		grid-template-columns: auto auto auto auto;
		align-items: center;
		gap: 1em;

		@media screen and (max-width: 800px) {
			grid-template-columns: auto auto;
		}
	}
</style>
