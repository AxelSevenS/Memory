// import { get } from 'core-js/core/dict'
import { defineStore } from 'pinia'

export const useCategoryStore = defineStore('categories', {
	state: () => ({
		categories: [],
	}),

	actions: {
		addCategory(category, theme) {
			this.categories.push({
				...category,
				theme: theme
			});

			console.log('Catégorie ajoutée: ', category);
		},

		removeCategory(category) {
			const index = this.categories.indexOf(category);

			if (index >= 0) {
				console.log('Catégorie retirée: ', category);
				delete this.categories[index];
			}
		},

		modifyCategory(category) {
			console.log(category);
		}
	},

	getters: {
		totalCategories: (state) => {
			console.log('Nombre de catégories: ', state.categories);
			return state.categories.length;
		}
	},

	persist: {
		storage: sessionStorage,
		paths: ['categories'],
	},
})

