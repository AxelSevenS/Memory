import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import App from './App.vue'
import { createPinia } from 'pinia'


const router = createRouter({
	history: createWebHistory(),
	routes: [
		{path: '/', component: () => import('./components/Card.vue').then(m => m.default)},
		{path: '/about', component: () => import('./components/CreateCard.vue').then(m => m.default)}
	]
});


const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);


createApp(App)
	.use(createPinia())
	.use(router)
	.mount('#app')
