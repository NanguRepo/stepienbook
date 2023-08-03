<script lang="ts">
	import { visibleModals, account } from '../../components/stores';
	import Modals from '../../components/Modals.svelte';
	import Sidebar from '../../components/Sidebar.svelte';
	import { getProfile, setProfile } from '../../components/functions';
</script>

<div class="p-4">
	<div class="flex flex-row gap-4 w-full">
		{#await getProfile() then profile}
			{#if profile.profilePicture}
				<img class="rounded-full" src={profile.profilePicture} alt="pfp" />
			{:else}
				<i class="fa-solid fa-user text-9xl" />
			{/if}
			<div class="flex flex-col w-full">
				<div class="flex flex-row gap-[0.33rem] items-center">
					<h1 class="text-3xl font-bold">{profile.displayName}</h1>
				</div>
				<h2 class="text-neutral-400 dark:text-neutral-500">@{$account.username}</h2>
				<p class="text-neutral-500 dark:text-neutral-300">
					{profile.bio ? profile.bio : 'Hi there! I am using stepienbook'}
				</p>
			</div>
			<button
				class="button h-fit"
				on:click={() => {
					$visibleModals = ['Edit profile', ...$visibleModals];
				}}>Edit</button
			>
		{/await}
	</div>
</div>
