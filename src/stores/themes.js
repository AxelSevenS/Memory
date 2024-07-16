import { toKebabCase } from '@/utility';
import { defineStore } from 'pinia';

export const useThemeStore = defineStore('themes', {
	state: () => ({
		themes: {
			science: {
				id: 'science',
				title: 'Science'
			},

			comedie: {
				id: 'comedie',
				title: 'Comédie'
			}
		},
	}),

	actions: {
		addTheme(theme) {
			const id = toKebabCase(theme.title);

			const newTheme = this.themes[id] = {
				...theme,
				id: id,
			};

			console.log('Thème ajouté: ', newTheme);

			return newTheme;
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
