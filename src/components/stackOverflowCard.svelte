<script lang="ts">
	import Card from './card.svelte';
	import type CardStyle from '../cardStyle';
	import type StackOverflowApi from '../services/stackOverflowApi';
	import StackOverflowLogo from './stackOverflowLogo.svelte';

	export let profile: StackOverflowApi.Profile;
	export let style: CardStyle;
</script>

<Card {style}>
	<img
		class:round-avatar={style.roundAvatar}
		style:width="{style.avatarSize}px"
		style:height="{style.avatarSize}px"
		alt="profile pri"
		src={profile.profile_image}
	/>
	<div class="right">
		<span>
			<StackOverflowLogo />
			{profile.display_name}
		</span>
		<span class="reputation">{profile.reputation.toLocaleString('en')}</span>
		<div class="badges">
			<span class="gold">{profile.badge_counts.gold}</span>
			<span class="silver">{profile.badge_counts.silver}</span>
			<span class="bronze">{profile.badge_counts.bronze}</span>
		</div>
	</div>
</Card>

<style lang="scss">
	@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,700;1,400&display=swap');

	.round-avatar {
		border-radius: 100%;
	}

	.right {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: space-between;
	}

	.reputation {
		font-weight: bold;
	}

	.badges span {
		&::before {
			content: '';
			display: inline-block;
			width: 0.5em;
			border-radius: 100%;
			aspect-ratio: 1/1;
		}

		&.gold::before {
			background-color: #ffcc00;
		}
		&.silver::before {
			background-color: #c0c0c0;
		}
		&.bronze::before {
			background-color: #cc9966;
		}
	}
</style>
