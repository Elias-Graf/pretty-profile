<script lang="ts">
	const data = {
		items: [
			{
				badge_counts: { bronze: 34, silver: 16, gold: 1 },
				account_id: 14280915,
				is_employee: false,
				last_modified_date: 1657229959,
				last_access_date: 1657284048,
				reputation_change_year: 450,
				reputation_change_quarter: 20,
				reputation_change_month: 20,
				reputation_change_week: 10,
				reputation_change_day: 0,
				reputation: 2652,
				creation_date: 1536072294,
				user_type: 'registered',
				user_id: 10315665,
				location: 'Switzerland',
				website_url: '',
				link: 'https://stackoverflow.com/users/10315665/elias',
				profile_image: 'https://i.stack.imgur.com/9PZNx.png?s=256&g=1',
				display_name: 'Elias'
			}
		],
		has_more: false,
		quota_max: 300,
		quota_remaining: 281
	} as const;

    let hello = "Elias";
</script>

<h1>{hello}</h1>