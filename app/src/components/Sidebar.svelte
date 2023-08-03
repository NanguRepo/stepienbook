<script lang="ts">
	import { page } from '$app/stores';
	const items = [
		{
			name: 'Home',
			icon: 'fa-home',
			url: '/home'
		},
		{
			name: 'Profile',
			icon: 'fa-user',
			url: '/profile'
		},
		{
			name: 'Sign out',
			icon: 'fa-right-from-bracket',
			url: '/signout'
		}
	];
</script>

<div class="flex flex-col gap-2">
	{#each items as item}
		<a
			class="bg-neutral-100 dark:bg-neutral-800 flex flex-row py-1 pl-2 pr-12 items-center w-full hover:bg-neutral-200 dark:hover:bg-neutral-700 whitespace-nowrap rounded {$page.url.pathname !=
			item.url
				? ''
				: 'text-white bg-neutral-900 hover:bg-neutral-700 dark:text-yellow-300 font-bold'}"
			href={item.url}
		>
			<div class="w-1/3">
				<i class="fa-solid {item.icon}" />
			</div>
			<div class="w-2/3">
				<p class="w-full pl-2">{item.name}</p>
			</div>
		</a>
	{/each}
</div>
