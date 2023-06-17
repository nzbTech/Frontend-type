<template>
    <div class="home">
        <h1 class="title">Produits</h1>
        <div class="notification is-primary text-align-center">
            C'est un exemple de notification Bulma.
        </div>
        <div v-if="loading" class="loading-indicator text-align-center">
          <i class="fas fa-spinner fa-spin"></i> Chargement en cours...
        </div>
        <div v-else>
          <div class="columns">
            <div class="column is-3">
              <h2 class="subtitlee">Filtres</h2>
              <FilterCollapse
                  :initialFilters="filters"
                  @filters-changed="getProducts(currentPage)"
              />
            </div>
            <div class="column">
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
                        <p class="is-1 no-wrap">{{ product.name }}</p>
                        <p class="subtitle is-6">{{ product.price }} €</p>
                      </div>
                    </div>
                    <div class="content">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Phasellus nec iaculis mauris.
                      <br>
                      <!-- <time datetime="2016-1-1">en stock</time> -->
                    </div>
                    <div class="columns reverse">
                      <div class="column">
                        <button 
                          class="button is-primary"
                          @click="addItem(product)"><i class="fas fa-shopping-basket"></i></button>
                      </div>
                    </div>
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
      itemsLimit: 10,
      products: null,
      currentPage: 1,
      totalPages: 10,
      filters: {
        category: '',
        sortByPrice: ''
      }
    }
  },
  computed: {
    ...mapGetters(['getUser', 'getCart'])
  },
  mounted() {
    const user = this.getUser
    if (user) {
      console.log('user =>', user)
    }
    this.getProducts()
  },
  methods: {
    addItem(product) {
      const itemData = {
        id: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
      }
      let products = this.getCart.products
      let productAlreadyInCart = products.find(i => i.id === product._id)
      if (productAlreadyInCart) {
        productAlreadyInCart.quantity++
      } else {
        products.push(itemData)
      }
      this.$store.commit('updateToCart', { obj: products, source: 'products' })
    },
    async getProducts(page) {
      if (page) {
        this.currentPage = page
      } else {
        this.currentPage = 1
      }
      try {
        const params = {
          page: this.currentPage,
          limit: this.itemsLimit
        }

        for (const filterKey in this.filters) {
          if (Object.prototype.hasOwnProperty.call(this.filters, filterKey)) {
            const filterValue = this.filters[filterKey]
            console.log('filterValue =>', filterValue)
            if (filterValue !== null  && filterValue !== '') {
              params[filterKey] = filterValue
            } else {
              delete params[filterKey]
            }
          }
        }
        const result = await this.$http.get('/products', {params: params})
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
.card-image {
  height: 40%;
}
.no-wrap {
  white-space: nowrap;
}
.subtitlee {
  text-align: center;
  font-weight: 600;
  line-height: 1.125;
  font-size: 1.5rem;
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
