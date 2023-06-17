import { createStore } from 'vuex'
import CryptoJS from 'crypto-js'

const store = createStore({
  state() {
    return {
      user: null,
      cart: {
        items: [],
        promo: null
      }
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    updateToCart(state, items) {
      state.cart.items = items
      const cleCryptage = process.env.VUE_APP_CRYPTO_SECRET
      const cartData = JSON.stringify(state.cart)
      const panierCrypte = CryptoJS.AES.encrypt(cartData, cleCryptage).toString()
      localStorage.setItem('cart', panierCrypte)
    }
  },
  actions: {
    updateUser({ commit }, user) {
      commit('setUser', user)
    }
  },
  getters: {
    getUser(state) {
      return state.user
    },
    cartItemsCount(state) {
      if (state.cart && state.cart.items) {
        return state.cart.items.length
      } else {
        return null
      }
    },
    getCart(state) {
      return state.cart
    }
  }
})

export default store