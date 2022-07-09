<script lang="ts">
	import type StackOverflowApi from '../services/stackOverflowApi';
	import Card from './card.svelte';

	export let profile: StackOverflowApi.Profile;
</script>

<Card>
	<img class="user-image" alt="profile pri" src={profile.profile_image} />
	<div class="right">
		<span>
			<img class="stackOverflow" alt="" src="stack.svg" />
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

	.user-image {
		width: 5rem;
		height: 5rem;
		border-radius: 100%;
	}

	.right {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: space-between;
	}

	.stackOverflow {
		width: 1em;
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
