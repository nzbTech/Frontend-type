import { createApp } from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/styles.css'
import './assets/js/bulma.js'
import 'bulma/css/bulma.css'
import '@fortawesome/fontawesome-free/css/all.css'
import NavBar from '@/components/NavBar.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'
import GenericMixin from '@/mixins/GenericMixin.js'

// Définissez la configuration de base d'Axios
axios.defaults.baseURL = 'http://localhost:3000/api/'; // Remplacez par votre URL de base

// Ajoutez l'intercepteur d'Axios pour l'en-tête d'autorisation Bearer
axios.interceptors.request.use(config => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDY2YzY5M2MzZjVmMzA1NjdmYmRiNTUiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2ODQ5NTQxNzEsImV4cCI6MTY4NTA0MDU3MX0.S2waILJjmY7esFSdEJ0f7aA01E7NDiU7IO70iB_5cNY'; // Remplacez par votre jeton d'autorisation
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, error => {
    return Promise.reject(error);
});

const app = createApp(App)

app.component('NavBar', NavBar)
app.component('PaginationComponent', PaginationComponent)
app.mixin(GenericMixin)

app.use(store).use(router).mount('#app')
