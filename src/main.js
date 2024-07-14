import { createApp } from 'vue';

import App from './App.vue';
import CardComponent from './components/CardComponent';

import router from './router';
import pinia from './pinia';

import './registerServiceWorker';

createApp(App)
.use(router)
.use(pinia)
.component("CardComponent", CardComponent)
.mount('#app');
