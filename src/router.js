import { createRouter, createWebHistory } from 'vue-router';

export default createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: () => import('./pages/HomePage.vue').then(m => m.default)
		},
		{
			path: '/create',
			component: () => import('./components/CreateCardComponent.vue').then(m => m.default)
		},
		{
			path: '/reminders',
			component: () => import('./pages/Reminders.vue').then(m => m.default)
		},
	]
});
