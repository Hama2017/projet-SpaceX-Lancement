import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import 'aos/dist/aos.css';
import AOS from 'aos';
import i18n from './language/i18n';

AOS.init();

const app = createApp(App);
app.use(i18n);
app.mount('#app');
