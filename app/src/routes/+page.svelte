<script lang="ts">
	import { account, visibleModals } from '../components/stores';
	import { browser } from '$app/environment';
	import Modals from '../components/Modals.svelte';
	const login = () => {
		$visibleModals = ['Log in', ...$visibleModals];
	};
	const signUp = () => {
		$visibleModals = ['Sign up', ...$visibleModals];
	};
	if ($account.username != '' && $account.password != '' && browser) {
		window.open('/home', '_self');
	}
</script>

<div class="h-screen w-screen flex flex-row gap-2 items-center justify-center dark:bg-neutral-900 dark:text-white">
	<button class="button" on:click={login}>Log in</button>
	<button class="button" on:click={signUp}>Sign up</button>
</div>
<div class="z-50 absolute top-1/2 left-1/2">
	<Modals />
</div>