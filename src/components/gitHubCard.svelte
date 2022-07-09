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
	<div class="right">
		<span class="name">{profile.name}</span>
		<span class="login">@{profile.login}</span>
	</div>
</Card>

<style lang="scss">
	.roundAvatar {
		border-radius: 100%;
	}

	.avatar {
		width: var(--avatarSize, 5em);
		height: var(--avatarSize, 5em);
	}

	.right {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}

	.name {
		font-weight: bold;
		font-size: 18pt;
	}

	.login {
		color: rgb(66, 66, 244);
	}
</style>
