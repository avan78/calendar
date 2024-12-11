import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import { createPinia } from 'pinia';
import './style.css';
import i18n from './i18n';
import App from './App.vue';

const pinia = createPinia();

createApp(App)
  .use(i18n)
  .use(pinia)
  .use(PrimeVue, {
    theme: {
      preset: Aura,
      cssLayer: true,
      locale: i18n.global.messages[i18n.global.locale.value]?.calendar?.picker,
    },
  })
  .mount('#app');
