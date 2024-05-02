import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import { initializeConnection } from './api/connection';
import './assets/css/styles.css';
import Panel from './components/Panel.vue';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);

initializeConnection();

app.component('panel', Panel);
app.mount('#app');
