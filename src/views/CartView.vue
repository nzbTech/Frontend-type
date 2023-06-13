<template>
    <div class="home">
        <h1 class="title">Panier</h1>
        <div class="notification is-primary text-align-center">
            C'est un exemple de notification Bulma.
        </div>
        <section class="section">
        <div
            v-if="getCart.items.length > 0"
            class="container">
        <table class="table is-striped is-fullwidth">
            <thead>
            <tr>
                <th>Produit</th>
                <th>Prix</th>
                <th>Quantité</th>
                <th>Total</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in getCart.items" :key="index">
                <td>{{ item.name }}</td>
                <td>{{ item.price }}</td>
                <td>
                <button class="button is-small" @click="decrementQuantity(item)">-</button>
                {{ item.quantity }}
                <button class="button is-small" @click="incrementQuantity(item)">+</button>
                </td>
                <td>{{ item.quantity * item.price }}</td>
                <td><button class="button is-danger is-small" @click="removeFromCart(item)">Supprimer</button></td>
            </tr>
            </tbody>
        </table>
        <div class="content has-text-right">
            <p>Total: {{ total }} €</p>
            <button class="button is-success" @click="checkout">Commander</button>
        </div>
        </div>
        <div 
            v-else>
            <p class="title">Panier vide</p>
        </div>
    </section>
    </div>
</template>
  
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(['getCart']),
    total() {
      return this.getCart.items.reduce((total, item) => total + item.price * item.quantity, 0)
    }
  },
  mounted() {
  },
  methods: {
    checkout() {
      this.$router.push('/pre-order')
    },
    incrementQuantity(item) {
      let cart = this.getCart.items
      let cartItem = cart.find(i => i.id === item.id)
      if (cartItem) {
        cartItem.quantity++
        this.$store.commit('updateItemCart', cart)
      }
    },
    decrementQuantity(item) {
      let cart = this.getCart.items
      let cartItem = cart.find(i => i.id === item.id)
      if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity--
        this.$store.commit('updateItemCart', cart)
      }
      else if (cartItem && cartItem.quantity == 1) {
        cart = cart.filter(i => i.id !== item.id)
        this.$store.commit('updateItemCart', cart)
      }
    },
    removeFromCart(item) {
      let cart = this.getCart.items
      let newCart = cart.filter(i => i.id !== item.id)
      this.$store.commit('updateItemCart', newCart)
    }
  }
}
</script>
  

<style scoped>

.button {
background-color: #00d1b2;
border-color: #00d1b2;
color: #f5f5f5;
margin-top: 1.5rem;
}
</style>