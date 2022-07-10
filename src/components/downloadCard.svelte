<script lang="ts">
	import html2Canvas from 'html2canvas';

	export let cardRef: HTMLElement;

	let outputRef: HTMLElement | undefined;

	const generate = async () => {
		const canvas = await html2Canvas(cardRef, {
			allowTaint: true,
			scale: 2,
			backgroundColor: 'transparent'
		});

		while (outputRef?.firstChild) outputRef.removeChild(outputRef.firstChild);
		outputRef?.appendChild(canvas);
	};
</script>

<button on:click={generate}>Generate</button>

<!-- This will be the output for the canvas -->
<div bind:this={outputRef} />

<span
	>After pressing generate, the card should appear as image above, right click it, and select save</span
>

<style type="scss">
    span {
        text-align: center;
    }
</style>