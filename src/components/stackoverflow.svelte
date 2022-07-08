<script lang="ts">
	import html2Canvas from 'html2canvas';

	interface StackoverflowProfile {
		badge_counts: { bronze: number; silver: number; gold: number };
		reputation: number;
		profile_image: string;
		display_name: string;
	}
	interface StackoverflowUserApiRes {
		items: StackoverflowProfile[];
	}

	let stackoverflowId = '';
	let profile: StackoverflowProfile | undefined;

	async function loadProfile() {
		if (stackoverflowId.trim().length === 0) return;

		const res = await fetch(
			`https://api.stackexchange.com/users/${stackoverflowId}?site=stackoverflow`
		);
		const data: StackoverflowUserApiRes = await res.json();

		profile = data.items[0];
	}

	function toCanvas() {
		html2Canvas(document.getElementById('preview')!, {
			allowTaint: true,
			scale: 2,
			backgroundColor: 'transparent'
		}).then((canvas) => {
			document.body.append(canvas);
		});
	}
</script>

<input bind:value={stackoverflowId} on:focusout={loadProfile} placeholder="stackoverflow id" />
<div class="container">
	{#if profile}
		<div class="card" id="preview">
			<img class="user-image" src={profile.profile_image} />
			<div class="right">
				<span>
					<img class="stackoverflow" src="stackoverflow_logo.svg" />
					{profile.display_name}
				</span>
				<span class="reputation">{profile.reputation.toLocaleString('en')}</span>
				<div class="badges">
					<span class="gold">{profile.badge_counts.gold}</span>
					<span class="silver">{profile.badge_counts.silver}</span>
					<span class="bronze">{profile.badge_counts.bronze}</span>
				</div>
			</div>
		</div>
	{/if}
</div>
<button on:click={toCanvas}>Download</button>

<style lang="scss">
	@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,700;1,400&display=swap');

	.container {
		display: flex;
		justify-content: center;
		font-family: 'Lato', sans-serif;
	}

	.card {
		font-size: 14pt;
		width: 14rem;
		display: flex;
		justify-content: space-between;
		color: rgb(223, 223, 223);
		background-color: rgb(44, 44, 44);
		padding: 0.5rem;
		border-radius: 0.5rem;
	}

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

	.stackoverflow {
		width: 1em;
	}

	.reputation {
		font-weight: bold;
	}

	.badges {
		span {
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
	}
</style>
