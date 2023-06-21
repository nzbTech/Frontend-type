import { createStore } from 'vuex'
import CryptoJS from 'crypto-js'

const store = createStore({
  state() {
    return {
      user: null,
      cart: {
        products: [],
        promo: null
      },
      cartId: null
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    updateToCart(state, payload) {
      const { obj, source } = payload
      if (source === 'products') {
        state.cart.products = obj
      } else if (source === 'promo') {
        state.cart.promo = obj
      }
      const cleCryptage = process.env.VUE_APP_CRYPTO_SECRET
      const cartData = JSON.stringify(state.cart)
      const panierCrypte = CryptoJS.AES.encrypt(cartData, cleCryptage).toString()
      state.cartId = panierCrypte
      localStorage.setItem('cart', panierCrypte)
    },
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
      if (state.cart && state.cart.products) {
        return state.cart.products.length
      } else {
        return null
      }
    },
    getCart(state) {
      return state.cart
    },
    getCartId(state) {
      return state.cartId
    }
  }
})

export default store