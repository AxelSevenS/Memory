// import { get } from 'core-js/core/dict'
import { toKebabCase } from '@/utility';
import { defineStore } from 'pinia'

export const useCategoryStore = defineStore('categories', {
	state: () => ({
		categories: {
			'astrologie': {
				id: 'astrologie',
				title: 'Astrologie',
				theme: 'science'
			},
			'geologie': {
				id: 'geologie',
				title: 'Géologie',
				theme: 'science'
			},

			'olivier-benoit': {
				id: 'olivier-benoit',
				title: 'Olivier Benoit',
				theme: 'comedie'
			}
		},
	}),

	actions: {
		addCategory(category, theme) {
			const id = toKebabCase(category.title);

			const newCategory = this.categories[id] = {
				...category,
				id: id,
				theme: theme
			};

			console.log('Catégorie ajoutée: ', newCategory);

			return newCategory;
		},

		removeCategory(category) {
			const index = this.categories.indexOf(category);

			if (index >= 0) {
				console.log('Catégorie retirée: ', category);
				delete this.categories[index];
			}
		},

		updateCategory(id, category) {
			const oldCategory = this.categories[id];
			const newCategory = this.categories[id] = {
				...oldCategory,
				...category,
				id: id,
			};

			console.log('Catégorie modifiée: ', newCategory);

			return newCategory;
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

