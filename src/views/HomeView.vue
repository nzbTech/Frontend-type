<template>
    <div class="home">
        <h1 class="title">Home</h1>
        <div class="notification is-primary text-align-center">
            C'est un exemple de notification Bulma.
        </div>
        <div v-if="loading" class="loading-indicator text-align-center">
          <i class="fas fa-spinner fa-spin"></i> Chargement en cours...
        </div>
        <div v-else>
          <div class="columns is-multiline">
              <div v-for="(product, index) in products" :key="index" class="column is-one-quarter is-4-tablet is-4-desktop is-3-widescreen">
                <div class="card text-align-center">
                  <div class="card-image">
                      <img :src="product.picture" class="image-class" alt="Placeholder image">
                  </div>
                  <div class="card-content">
                    <div class="media">
                      <div class="media-left">
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
                        <button 
                          class="button is-primary"
                          @click="addToCart(product)"><i class="fas fa-shopping-basket"></i></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          <PaginationComponent
          :current-page="currentPage"
          :total-pages="totalPages"
          :service-props="service"
          @update-page="updatePage"
          ></PaginationComponent>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      loading: true,
      service:'products',
      itemsLimit: 20,
      products: null,
      currentPage: 1,
      totalPages: 10
    }
  },
  computed: {
    ...mapGetters(['getUser'])
  },
  mounted() {
    const user = this.getUser
    if (user) {
      console.log('user =>', user)
    }
    this.getProducts()
  },
  methods: {
    addToCart(item) {
      this.$store.commit('addToCart', item)
    },
    async getProducts(page) {
      if (page) {
        this.currentPage = page
      } else {
        this.currentPage = 1
      }
      try {
          const result = await this.$http.get('/products', {
            params: {
              page: this.currentPage,
              limit: this.itemsLimit,
            }
          })
          const { products, totalItems, totalPages } = result.data
          this.products = products
          this.totalItems = totalItems
          this.totalPages = totalPages
          this.loading = false
      } catch (error) {
          console.error(error)
      }
    },
    updatePage(page) {
      this.getProducts(page)
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
.image-class {
  max-height: 200px;
  object-fit: cover;
  object-position: center;
}
.button.is-success {
  width: 20%;
}
.card {
  height: 500px;
}
/* .image.is-4by3 {
    padding-top: 75%;
    object-fit: cover;
    object-position: center;
} */
/* .reverse {
  flex-direction: row-reverse;
} */
</style>
