import { createStore } from 'vuex'
import CryptoJS from 'crypto-js'

const store = createStore({
  state() {
    return {
      user: null,
      cart: []
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    addToCart(state, item) {
      const itemData = {
        id: item._id,
        name: item.name,
        price: item.price,
        quantity: 1,
      }
      const existingProduct = state.cart.find(product => product.id === itemData.id)
      if (existingProduct) {
        existingProduct.quantity += 1
      } else {
        state.cart.push(itemData)
      }
      const cleCryptage = process.env.VUE_APP_CRYPTO_SECRET
      const cartData = JSON.stringify(state.cart)
      const panierCrypte = CryptoJS.AES.encrypt(cartData, cleCryptage).toString()
      localStorage.setItem('cart', panierCrypte)
      // console.log('panier decrypted =>', cartData)
      // console.log('panier crypted =>', panierCrypte)
    },
    updateItemCart(state, item) {
      state.cart = item
      const cleCryptage = process.env.VUE_APP_CRYPTO_SECRET
      const cartData = JSON.stringify(state.cart)
      const panierCrypte = CryptoJS.AES.encrypt(cartData, cleCryptage).toString()
      localStorage.setItem('cart', panierCrypte)
      console.log('panier decrypted =>', cartData)
      console.log('panier crypted =>', panierCrypte)
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
      return state.cart.length
    },
    getCart(state) {
      return state.cart
    }
  }
})

export default store