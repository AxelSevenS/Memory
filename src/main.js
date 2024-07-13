import { createApp } from 'vue'

import { createRouter, createWebHistory } from 'vue-router'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import CardComponent from './components/CardComponent';

import App from './App.vue'


const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: () => import('./pages/HomePage.vue').then(m => m.default)
		},
		{
			path: '/create',
			component: () => import('./components/CreateCardComponent.vue').then(m => m.default)
		}
	]
});

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);


createApp(App)
	.use(router)
	.use(pinia)
	.component("CardComponent", CardComponent)
	.mount('#app');
