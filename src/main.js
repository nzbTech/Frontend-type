import process from 'process'
import { createApp } from 'vue'
import axios from 'axios'
import jwt from 'jsonwebtoken'
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

window.process = process
axios.defaults.baseURL = 'http://localhost:3000/api/'
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config;
  }, error => {
    return Promise.reject(error)
})

const app = createApp(App)


const token = localStorage.getItem('token')
if (token) {
  const decodedToken = jwt.decode(token)
  store.dispatch('updateUser', decodedToken.userId)
}

const cartData = localStorage.getItem('cart')
console.log('Main cartData =>', cartData)
if (cartData) {
  store.state.cart = JSON.parse(cartData)
}

app.config.globalProperties.$http = axios
app.component('NavBar', NavBar)
app.component('PaginationComponent', PaginationComponent)
app.mixin(GenericMixin)

app.use(store).use(router).mount('#app')
