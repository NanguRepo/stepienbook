import { account } from './stores';
import { get } from 'svelte/store';
import axios from 'axios';
export interface profile {
	bio: string;
	displayName: string;
	profilePicture: string | null;
}
export const getProfile = async (): Promise<profile> => {
	const response = await axios.post('https://api.nangu.dev/v2/stepienbook/getProfile', {
		user: get(account).username
	});
	if (response.status == 200) {
		return {
			bio: response.data.bio || "Hi! I'm using stepienbook.",
			displayName: response.data.displayName || get(account).username,
			profilePicture: response.data.profilePicture
		};
	}
	throw new Error();
};
export const setProfile = async (profile: profile): Promise<void> => {
	const response = await axios.post('https://api.nangu.dev/v2/stepienbook/setProfile', {
		user: get(account).username,
		password: get(account).password,
		profile: profile
	});
	if (response.status == 200) {
		return;
	}
	throw new Error();
};
