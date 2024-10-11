import process from 'process'
import { createApp } from 'vue'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import CryptoJS from 'crypto-js'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/styles.css'
import './assets/js/bulma.js'
import 'bulma/css/bulma.css'
import '@fortawesome/fontawesome-free/css/all.css'
import NavBar from '@/components/NavBar.vue'
import FilterCollapse from '@/components/FilterCollapse.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'
import TraidingViewWidget from '@/components/TraidingViewWidget.vue'
import GenericMixin from '@/mixins/GenericMixin.js'

window.process = process
axios.defaults.baseURL = 'http://localhost:3333/api/'
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
  store.dispatch('updateUser', decodedToken)
}

const cartData = localStorage.getItem('cart')
if (cartData) {
  const cleCryptage = process.env.VUE_APP_CRYPTO_SECRET
  const decryptedBytes = CryptoJS.AES.decrypt(cartData, cleCryptage)
  const panierDecrypte = decryptedBytes.toString(CryptoJS.enc.Utf8)
  store.state.cartId = cartData
  store.state.cart = JSON.parse(panierDecrypte)
  console.log('panier => ', panierDecrypte)
}

app.config.globalProperties.$http = axios
app.component('NavBar', NavBar)
app.component('PaginationComponent', PaginationComponent)
app.component('FilterCollapse', FilterCollapse)
app.component('TraidingViewWidget', TraidingViewWidget)
app.mixin(GenericMixin)

app.use(store).use(router).mount('#app')
