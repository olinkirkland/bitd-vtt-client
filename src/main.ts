import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import { initializeConnection } from './api/connection';
import { router } from './router';
import Divider from './components/Divider.vue';

// Create the app
const app = createApp(App);

// Components
app.component('divider', Divider);

// Plugins
const pinia = createPinia();
app.use(pinia);
app.use(router);

initializeConnection();

app.mount('#app');
