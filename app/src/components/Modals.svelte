<script lang="ts">
	import { visibleModals, account } from './stores';
	import { getProfile, setProfile } from './functions';
	import type { profile } from './functions';
	import axios from 'axios';
	$: username = '';
	$: password = '';
	$: valid = username.length > 3 && password.length > 3;
	$: errorText = {
		username: '',
		password: ''
	};
	$: created = false;

	const login = async () => {
		axios
			.post('https://api.nangu.dev/v2/stepienbook/verify', {
				username: username,
				password: password
			})
			.then(() => {
				$account = {
					username: username,
					password: password
				};
				if ($visibleModals[0] == 'Log in') {
					$visibleModals.shift();
					$visibleModals = $visibleModals;
				}
				window.open('/home', '_self');
			})
			.catch((error) => {
				if ($visibleModals[0] == 'Log in') {
					errorText.password = 'Invalid password';
				} else {
					alert('An error occurred: ' + error);
				}
			});
	};
	const signUp = async () => {
		axios
			.post('https://api.nangu.dev/v2/stepienbook/createAccount', {
				username: username,
				password: password
			})
			.then(() => {
				$visibleModals.shift();
				$visibleModals = $visibleModals;
				login();
			})
			.catch((error) => {
				errorText.username = '';
				errorText.password = '';
				switch (error.response.data.result) {
					case 'TAKEN':
						errorText.username = 'Username taken.';
					default:
						console.log(error);
				}
			});
	};
	function applyProfileChange(e) {
		e.preventDefault();
		const formData = new FormData(e.target);

		const data = {};
		for (let field of formData) {
			const [key, value] = field;
			data[key] = value;
		}
		console.log(data);
	}
</script>

{#each $visibleModals as modal}
	<div class="modal transform -translate-x-1/2 -translate-y-1/2 dark:text-white">
		<div class="flex flex-row justify-between">
			{#if !created}<h1 class="font-bold text-xl">{modal}</h1>{:else}<div />{/if}
			<button
				class="rounded hover:bg-neutral-100 active:bg-neutral-200 dark:hover:bg-neutral-600 dark:active:bg-neutral-800 px-2"
				on:click={() => {
					$visibleModals.shift();
					$visibleModals = $visibleModals;
				}}>×</button
			>
		</div>
		{#if ['Log in', 'Sign up'].includes(modal)}
			<div class="flex flex-col">
				<form class="flex flex-col gap-2">
					<div class="flex flex-col">
						<label for="username" class="secondary-text">Username</label>
						<input id="username" bind:value={username} />
						<p class="error-text text-xs">{errorText.username}</p>
					</div>
					<div class="flex flex-col">
						<label for="password" class="secondary-text">Password</label>
						<input id="password" type="password" bind:value={password} />
						<p class="error-text text-xs">{errorText.password}</p>
						{#if modal == 'Log in'}
							<a
								class="w-fit text-xs text-blue-500 hover:text-blue-600 hover:underline"
								href="https://en.wikipedia.org/wiki/Trollface"
								target="_blank">Forgot password?</a
							>
						{/if}
					</div>
					<button
						class="fancy-button from-blue-400 to-purple-400"
						disabled={!valid}
						on:click={modal == 'Log in' ? login : signUp}
					>
						{modal == 'Log in' ? 'Login' : 'Create account'}
					</button>
				</form>
			</div>
		{:else if modal == 'Edit profile'}
			{#await getProfile()}
				<div class="flex flex-col h-full w-full">
					<p class="text-neutral-400">Loading...</p>
				</div>
			{:then profile}
				<form class="flex flex-col gap-2" on:submit={applyProfileChange}>
					<div class="flex flex-col">
						<label for="displayName" class="secondary-text">Display name</label>
						<input
							id="displayName"
							name="displayName"
							type="text"
							maxlength={32}
							value={profile.displayName}
						/>
					</div>
					<div class="flex flex-col">
						<label for="bio" class="secondary-text">Bio</label>
						<textarea id="bio" name="bio" value={profile.bio} />
					</div>
					<div class="flex flex-col">
						<label for="profilePicture" class="secondary-text">Profile picture</label>
						<p class="text-xs text-neutral-400">Only URLs allowed for now.</p>
						<input
							id="profilePicture"
							name="profilePicture"
							type="url"
							value={profile.profilePicture}
						/>
					</div>
					<button class="fancy-button from-blue-400 to-purple-400"> Apply </button>
				</form>
			{/await}
		{/if}
	</div>
{/each}
