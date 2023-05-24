<template>
    <div class="home">
        <h1 class="title">Bienvenue sur Home</h1>
        <div class="notification is-primary">
            C'est un exemple de notification Bulma.
        </div>
        <PaginationComponent
          :current-page="currentPage"
          :total-pages="totalPages"
          @update-page="updatePage"
        ></PaginationComponent>
        <div class="columns is-multiline">
            <div v-for="(product, index) in products" :key="index" class="column is-one-quarter">
              <div class="card">
                <div class="card-image">
                  <figure class="image is-4by3">
                    <img :src="product.picture" alt="Placeholder image">
                  </figure>
                </div>
                <div class="card-content">
                  <div class="media">
                    <div class="media-left">
                      <!-- <figure class="image is-48x48">
                        <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                      </figure> -->
                    </div>
                    <div class="media-content">
                      <p class="title is-4">{{ product.name }}</p>
                      <p class="subtitle is-6">{{ product.price }} €</p>
                    </div>
                  </div>

                  <div class="content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Phasellus nec iaculis mauris.
                    <br>
                    <time datetime="2016-1-1">en stock</time>
                  </div>
                  <div class="columns reverse">
                    <div class="column">
                      <button class="button is-success">Ajouter au panier</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <PaginationComponent
          :current-page="currentPage"
          :total-pages="totalPages"
          @update-page="updatePage"
        ></PaginationComponent>
    </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      itemsLimit: 20,
      products: null,
      currentPage: 1,
      totalPages: 10
    };
  },
  mounted() {
    this.updatePage()
  },
  methods: {
    async updatePage(page) {
      this.currentPage = page
      try {
          const result = await axios.get('/products', {
            params: {
              page: this.currentPage,
              limit: this.itemsLimit,
            }
          })
          const { products, totalItems, totalPages } = result.data
          this.products = products
          this.totalItems = totalItems
          this.totalPages = totalPages

      } catch (error) {
          console.error(error)

      }
    }
  }
}
</script>

<style>
/* .router-link-active,
.router-link-exact-active {
    color: inherit !important;
} */

.card-header-title {
  height: 300px;
}
/* .reverse {
  flex-direction: row-reverse;
} */
</style>
