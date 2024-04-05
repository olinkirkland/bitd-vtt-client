import { createApp } from 'vue';
import './assets/css/styles.css';
import App from './App.vue';
import Panel from './components/Panel.vue';
import axios from 'axios';

// If running on localhost, use the local server
axios.defaults.baseURL =
  location.hostname === 'localhost'
    ? 'http://localhost:3005'
    : 'https://xxxx-xxxx-production.up.railway.app/';

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';

const app = createApp(App);
app.component('panel', Panel);
app.mount('#app');
