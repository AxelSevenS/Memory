import { defineStore } from 'pinia';

export const useThemeStore = defineStore('themes', {
	state: () => ({
		themes: {},
	}),

	actions: {
		addTheme(theme) {
			const id = encodeURIComponent(theme.title);

			this.themes[id] = {
				...theme,
				id: id,
			};

			console.log('Thème ajouté: ', theme);
		},

		removeTheme(theme) {
			const index = this.themes.indexOf(theme);

			if (index >= 0) {
				console.log('Thème retirée: ', theme);
				delete this.themes[index];
			}
		},
		modifyTheme(theme) {
			const index = this.themes.indexOf(theme);

			if (index >= 0) {
				console.log('Thème modifié: ', theme);
				this.themes[index] = theme;
			}
		}
	},

	getters: {
		totalThemes: (state) => {
			return state.themes.length;
		}
	},

	persist: {
		storage: localStorage,
		paths: ['themes'],
	},
});
