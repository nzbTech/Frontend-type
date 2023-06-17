<template>
    <div class="home">
        <h1 class="title">Panier</h1>
        <div class="notification is-primary text-align-center">
            C'est un exemple de notification Bulma.
        </div>
        <section class="section">
        <div
            v-if="getCart.products.length > 0"
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
            <tr v-for="(product, index) in getCart.products" :key="index">
                <td>{{ product.name }}</td>
                <td>{{ product.price }}</td>
                <td>
                <button class="button is-small" @click="decrementQuantity(product)">-</button>
                {{ product.quantity }}
                <button class="button is-small" @click="incrementQuantity(product)">+</button>
                </td>
                <td>{{ product.quantity * product.price }}</td>
                <td><button class="button is-danger is-small" @click="removeFromCart(product)">Supprimer</button></td>
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
      return this.getCart.products.reduce((total, product) => total + product.price * product.quantity, 0)
    }
  },
  mounted() {
  },
  methods: {
    checkout() {
      this.$router.push('/pre-order')
    },
    incrementQuantity(currentProduct) {
      let products = this.getCart.products
      let product = products.find(i => i.id === currentProduct.id)
      if (product) {
        product.quantity++
        this.$store.commit('updateToCart', { obj: products, source: 'products' })
      }
    },
    decrementQuantity(currentProduct) {
      let products = this.getCart.products
      let product = products.find(i => i.id === currentProduct.id)
      if (product && product.quantity > 1) {
        product.quantity--
        this.$store.commit('updateToCart', { obj: products, source: 'products' })
      }
      else if (product && product.quantity == 1) {
        products = products.filter(i => i.id !== product.id)
        this.$store.commit('updateToCart', { obj: products, source: 'products' })
      }
    },
    removeFromCart(currentProduct) {
      let products = this.getCart.products
      let newProducts = products.filter(i => i.id !== currentProduct.id)
      this.$store.commit('updateToCart', { obj: newProducts, source: 'products' })
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