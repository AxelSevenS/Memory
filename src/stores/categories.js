// import { get } from 'core-js/core/dict'
import { defineStore } from 'pinia'

export const useCategoryStore = defineStore('categories', {
	state: () => ({
		categories: {},
	}),

	actions: {
		addCategory(category, theme) {
			const id = encodeURIComponent(category.title);

			this.categories[id] = {
				...category,
				id: id,
				theme: theme
			};

			console.log('Catégorie ajoutée: ', category);
		},

		removeCategory(category) {
			const index = this.categories.indexOf(category);

			if (index >= 0) {
				console.log('Catégorie retirée: ', category);
				delete this.categories[index];
			}
		},
	},

	getters: {
		totalCategories: (state) => {
			return state.categories.length;
		},

		fromTheme: (state) => (theme) => {
			return Object.keys(state.categories)
				.filter( id => {
					const category = state.categories[id];
					return category.theme === theme;
				})
				.map( id => state.categories[id] );
		},
	},

	persist: {
		storage: localStorage,
		paths: ['categories'],
	},
})

