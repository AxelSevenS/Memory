import { defineStore } from 'pinia';

export const usePreferenceStore = defineStore('preferences', {
	state: () => ({
		startDate: new Date(Date.now()),
	}),
});
