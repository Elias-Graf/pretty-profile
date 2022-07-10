<script lang="ts">
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';

	import Page from '../page';

	if (browser) goto(Page.GitHub);
</script>
