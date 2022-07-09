<script lang="ts">
	import type GitHubApi from '../services/gitHubApi';

	import Card from './card.svelte';

	export let profile: GitHubApi.Profile;
</script>

<Card>
	<img class="avatar" src={profile.avatar_url} alt="GitHub avatar of the user {profile.name}" />
	{profile.name}
</Card>

<style lang="scss">
	.avatar {
		width: 5em;
		height: 5em;
	}
</style>
