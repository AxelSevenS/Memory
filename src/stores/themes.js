import { defineStore } from 'pinia';

export const useThemeStore = defineStore('themes', {
	state: () => ({
		themes: [],
	}),

	actions: {
		addTheme(theme) {
			this.themes.push({
				...theme
			});

			console.log('Thème ajouté: ', theme);
		},

		removeTheme(theme) {
			const index = this.themes.indexOf(theme);

			if (index >= 0) {
				console.log('Thème retirée: ', theme);
				delete this.themes[index];
			}
		},
	},

	persist: {
		storage: sessionStorage,
		paths: ['themes'],
	},
});
