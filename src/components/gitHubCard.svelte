<script lang="ts">
	import type GitHubApi from '../services/gitHubApi';

	import Card from './card.svelte';

	export let profile: GitHubApi.Profile;
	export let roundAvatar = true;
	export let avatarSize = '';
</script>

<Card>
	<img
		class="avatar"
		class:roundAvatar
		style="--avatarSize:{avatarSize}"
		src={profile.avatar_url}
		alt="GitHub avatar of the user {profile.name}"
	/>
	{profile.name}
</Card>

<style lang="scss">
	.roundAvatar {
		border-radius: 100%;
	}
	.avatar {
		width: var(--avatarSize, 5em);
		height: var(--avatarSize, 5em);
	}
</style>
