import { createRouter, createWebHistory } from 'vue-router';

export default createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/cards',
			children: [
				{
					path: 'create/:categoryId',
					component: () => import('./pages/Cards/CreateCard.vue').then(m => m.default),
				},
				{
					path: ':cardId',
					component: () => import('./pages/Cards/Card.vue').then(m => m.default),
				},
				{
					path: 'list/:categoryId',
					component: () => import('./pages/Cards/CardList.vue').then(m => m.default),
				},
			]
		},
		{
			path: '/categories',
			children: [
				{
					path: 'create/:themeId',
					component: () => import('./pages/Categories/CreateCategory.vue').then(m => m.default),
				},
				{
					path: ':categoryId',
					component: () => import('./pages/Categories/Category.vue').then(m => m.default),
				},
				{
					path: 'list/:themeId',
					component: () => import('./pages/Categories/CategoryList.vue').then(m => m.default),
				},
			]
		},
		{
			path: '/themes',
			children: [
				{
					path: 'create',
					component: () => import('./pages/Themes/CreateTheme.vue').then(m => m.default),
				},
				{
					path: ':themeId',
					component: () => import('./pages/Themes/Theme.vue').then(m => m.default),
				},
				{
					path: '',
					component: () => import('./pages/Themes/ThemeList.vue').then(m => m.default),
				}
			]
		},
		{
			path: '/preferences',
			component: () => import('./pages/Preferences.vue').then(m => m.default)
		},
		{
			path: '/',
			component: () => import('./pages/HomePage.vue').then(m => m.default)
		},
	]
});
