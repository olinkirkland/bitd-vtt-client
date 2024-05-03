import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import { initializeConnection } from './api/connection';
// import Panel from './components/Panel.vue';
import router from './router';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

initializeConnection();

// app.component('Panel', Panel);
app.mount('#app');
