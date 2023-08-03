import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import axios from 'axios';

const emptyArray: Array<string> = [];
const getObject = (item: string, fallback: account): account => {
	try {
		return JSON.parse(localStorage.getItem(item) || JSON.stringify(fallback));
	} catch {
		return fallback;
	}
};

interface account {
	username: string;
	password: string;
}

export const visibleModals = writable(emptyArray);
export const account = writable(
	getObject('account', {
		username: '',
		password: ''
	})
);

account.subscribe((value) => {
	if (browser) {
		localStorage.setItem('account', JSON.stringify(value));
	}
});
