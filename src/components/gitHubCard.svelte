<script lang="ts">
	import type CardStyle from '../cardStyle';
	import type GitHubApi from '../services/gitHubApi';
	import Card from './card.svelte';
	import GitHubLogo from './gitHubLogo.svelte';

	export let style: CardStyle;
	export let profile: GitHubApi.Profile;
</script>

<Card {style}>
	<img
		class="avatar"
		class:roundAvatar={style.roundAvatar}
		style:height="{style.avatarSize}px"
		style:width="{style.avatarSize}px"
		src={profile.avatar_url}
		alt="GitHub avatar of the user {profile.name}"
	/>
	<div class="right">
		<span class="name"><GitHubLogo fill={style.color} /> {profile.name}</span>
		<span style:color={style.linkColor}>@{profile.login}</span>
	</div>
</Card>

<style lang="scss">
	.roundAvatar {
		border-radius: 100%;
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
</style>
