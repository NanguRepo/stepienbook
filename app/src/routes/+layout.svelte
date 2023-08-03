<script lang="ts">
	import '../app.css';
	import { account } from '../components/stores';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { visibleModals } from '../components/stores';
	import Modals from '../components/Modals.svelte';
	import Sidebar from '../components/Sidebar.svelte';

	$: page = '';
	onMount(() => {
		if (($account.username == '' || $account.password == '') && window.location.pathname != '/') {
			window.open('/', '_self');
		}
		page = window.location.pathname;
	});
</script>

{#if page == ''}
	<div class="h-screen w-screen dark:bg-neutral-800" />
{:else if page == '/'}
	<slot />
{:else}
	<div
		class="flex flex-row h-screen w-screen p-36 items-center justify-center dark:bg-neutral-900 dark:text-white"
	>
		<div class="flex flex-row w-full h-full gap-2">
			<div class="items-start">
				<Sidebar />
			</div>
			<div class="h-full w-full bg-neutral-100 dark:bg-neutral-800 rounded p-2">
				<slot />
			</div>
		</div>
	</div>
	{#if $visibleModals.length > 0}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			on:click={() => {
				$visibleModals.shift();
				$visibleModals = $visibleModals;
			}}
			class="absolute z-10 top-0 bottom-0 left-0 right-0 bg-black/50"
		/>
	{/if}
	<div class="z-50 absolute top-1/2 left-1/2">
		<Modals />
	</div>
{/if}
