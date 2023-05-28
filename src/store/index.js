import { createStore } from 'vuex'

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
      localStorage.setItem('cart', JSON.stringify(state.cart))
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
    }
  }
})

export default store