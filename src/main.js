import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "primevue/resources/themes/saga-blue/theme.css";  
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import './assets/main.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import PrimeVue from 'primevue/config';

const app = createApp(App)

app.use(router)
app.use(PrimeVue);
app.mount('#app')
