import { createApp } from 'vue';

import App from './App.vue';
import CardComponent from './components/CardComponent';
import CategoryComponent from './components/CategoryComponent';
import ThemeComponent from './components/ThemeComponent';

import router from './router';
import pinia from './pinia';

import './registerServiceWorker';

createApp(App)
.use(router)
.use(pinia)
.component("CardComponent", CardComponent)
.component("CategoryComponent", CategoryComponent)
.component("ThemeComponent", ThemeComponent)
.mount('#app');
