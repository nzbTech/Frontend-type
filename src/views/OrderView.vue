<template>
  <div class="home">
    <h1 class="title">Checkout</h1>
      <div class="notification is-primary text-align-center">
          C'est un exemple de notification Bulma.
      </div>
    <div class="columns padding">
      <div class="column is-half">
        <div v-if="!getUser">
          <div class="center">
            <h2 class="subtitle">Continuer en tant qu'invité</h2>
            <button class="button" @click="toggleModalLogin">Déjà client ? Cliquez ici pour vous connecter</button>
          </div>
          <div 
            v-if="openLogin"
            class="border">
            <i class="top-left fa-solid fa-x custom-cursor" @click="openLogin = false"></i>
            <form>
              <div class="columns">
                <div class="field column">
                  <label class="label">Email</label>
                  <div class="control has-icons-left">
                      <input 
                          type="email" 
                          placeholder="guillaume@gmail.com" 
                          class="input" 
                          v-model="customer.email">
                      <span class="icon is-small is-left">
                      <i class="fa fa-envelope"></i>
                      </span>
                  </div>
                </div>
                <div class="field column">
                  <label class="label">Mot de passe</label>
                  <div class="control has-icons-left">
                      <input 
                          type="password" 
                          placeholder="*******" 
                          class="input" 
                          v-model="customer.password">
                      <span class="icon is-small is-left">
                      <i class="fa fa-lock"></i>
                      </span>
                  </div>
                </div>
              </div>
              <div class="columns">
                <div class="field column">
                  <div>
                      <form @submit="sendResetRequest">
                      <button class="button" type="submit">J'ai oublié mon mot de passe</button>
                      </form>
                      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
                      <p v-else-if="successMessage" class="success-message">{{ successMessage }}</p>
                  </div>
                  <!-- <div v-if="errorMessage" class="error-message">
                      {{ errorMessage }}
                  </div> -->
                </div>
                <div class="field column">
                  <button 
                      class="button"
                      @click="login(origin)">
                      Se connecter
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div>
          <form>
            <div class="columns">
              <div class="field column">
                <label class="label" for="firstName">Prénom:</label>
                <div class="control">
                  <input class="input" type="text" id="firstName" v-model="customer.firstname">
                </div>
              </div>
              <div class="field column">
                <label class="label" for="lastName">Nom:</label>
                <div class="control">
                  <input class="input" type="text" id="lastName" v-model="customer.name">
                </div>
              </div>
            </div>
            <div class="field">
              <label class="label" for="address">Adresse:</label>
              <div class="control">
                <input class="input" type="text" id="address" v-model="customer.address.line">
              </div>
            </div>
            <div class="field">
              <label class="label" for="city">Ville:</label>
              <div class="control">
                <input class="input" type="text" id="city" v-model="customer.address.city">
              </div>
            </div>
            <div class="field">
              <label class="label" for="postal_code">Code Postal:</label>
              <div class="control">
                <input class="input" type="text" id="postalCode" v-model="customer.address.zip_code">
              </div>
            </div>
            <div class="field">
              <label class="label" for="country">Pays:</label>
              <div class="control">
                <input class="input" type="text" id="country" v-model="customer.address.country">
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="column is-half">
        <div class="cart-summary">
          <h2 class="subtitle center">Récapitulatif du panier</h2>
          <ul>
            <li v-for="item in getCart.products" :key="item.id">
              {{ item.name }} - {{ item.price }} €  x {{ item.quantity }} ({{ item.price *  item.quantity }} €)
            </li>
          </ul>
          <p class="subtitle2 mb-5">Sous total: {{ getSousTotalPrice() }} €</p>
          <div class="field columns">
            <label class="label column is-3" for="promoCode">Code promo:</label>
            <div class="control column">
              <input class="input" type="text" id="promoCode" v-model="codePromo">
            </div>
            <div class="column">
            <button class="button" @click="checkCodePromo">Vérifier le code promo</button>
            </div>
          </div>
          <div 
            v-if="getCart.promo"
            class="columns">
            <p class="subtitle2 mb-5 has-text-primary border-style">{{ getCart.promo.name }} <i class="fa-solid fa-x fa-xs custom-cursor" v-on:click="deleteCodePromo"></i></p>
            <p class="subtitle2 mb-5 has-text-primary">({{ getCart.promo.percentage }}%)</p>
          </div>
          <div id="promo-errors" role="alert"></div>
          <p class="subtitle mb-5">Total: {{ getTotalPrice() }} €</p>
        </div>
        <div class="payment-form">
          <form @submit.prevent="submitPayment" class="stripe-form">
            <div id="card-number-element"></div>
            <div id="card-expiry-element"></div>
            <div id="card-cvc-element"></div>
            <div id="postal-code-element"></div>
            <div id="card-errors" role="alert"></div>
            <button class="btn btn-primary">Payer</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { loadStripe } from "@stripe/stripe-js"
  import isEqual from 'lodash/isEqual';
  
  export default {
    data() {
      return {
        origin:'OrderView',
        stripe: null,
        elements: null,
        codePromo: null,
        card: null,
        cardholderName: null,
        cardholderEmail: null,
        customer: {
          firstName: '',
          lastName: '',
          address: {
            line: '',
            city: '',
            zip_code: '',
            country: ''
          }
        },
        openLogin: false,
        cardNumberElement: null,
        cardExpiryElement: null,
        cardCvcElement: null,
        postalCodeElement: null,
      }
    },
    computed: {
      ...mapGetters(['getCart', 'getCartId', 'getUser'])
    },
    async mounted() {
      await this.init()
    },
    methods: {
      async init() {
        await this.getUserData()
        await this.initStripe()
      },
      async updateUserData() {
        if (this.getUser) {
          await this.$http.patch('/user/update/' + this.getUser.userId, this.customer)
        } else {
          console.log('Utilisateur mode invité')
        }
      },
      async checkCartData() {
        const result = await this.$http.post('/check-products', { cart:  this.getCart})
        let cartChecked = result.data
        if (isEqual(cartChecked, this.getCart)) {
          return true
        } else {
          this.$store.commit('updateToCart', { obj: cartChecked.products, source: 'products' })
          return false
        }
      },
      async createOrder() {
        const params = {
          user: this.customer,
          cart:  this.getCart
        } 
        try {
          await this.$http.post('/orders/create', params)
        } catch (error) {
          console.log('error =>', error)
        }
      },
      async initStripe() {
        // CREATION DOM STRIPE //
        this.stripe = await loadStripe(process.env.VUE_APP_STRIPE_PUBLIC_KEY)
        this.elements = this.stripe.elements()

        this.cardNumberElement = this.elements.create("cardNumber")
        this.cardNumberElement.mount("#card-number-element")

        this.cardExpiryElement = this.elements.create("cardExpiry")
        this.cardExpiryElement.mount("#card-expiry-element")

        this.cardCvcElement = this.elements.create("cardCvc")
        this.cardCvcElement.mount("#card-cvc-element")

        this.postalCodeElement = this.elements.create("postalCode")
        this.postalCodeElement.mount("#postal-code-element")

        // GESTION ERREURS STRIPE //
        let displayError = document.getElementById('card-errors')
        const elements = [
          this.cardNumberElement,
          this.cardExpiryElement,
          this.cardCvcElement,
          this.postalCodeElement
        ]
        elements.forEach(element => {
          element.on('change', function(event) {
            if (event.error) {
              displayError.textContent = event.error.message
            } else {
              displayError.textContent = ''
            }
          })
        })
      },
      async submitPayment() {
        // CREATION PAIEMENT STRIPE //
        await this.updateUserData()
        await this.createOrder()
        let cartUpToDate = await this.checkCartData()
        if (!cartUpToDate) {
          console.log('Attention ! Le prix d\'un article a changé')
          return
        }

        const params = {
            user: this.customer,
            cart:  this.getCartId
        } 
        const response = await this.$http.post('/create-payment-intent', params)
        const client_secret = response.data.client_secret

        const result = await this.stripe.confirmCardPayment(client_secret, {
          payment_method: {
            card: this.cardNumberElement,
            billing_details: {
              name: 'leger',
              email: 'guillaumeleger140@gmail.com'
            }
          }
        })
        if (result.error) {
          var errorElement = document.getElementById('card-errors')
          errorElement.textContent = result.error.message
        } else {
          if (result.paymentIntent.status === 'succeeded') {
            console.log("Payment processed successfully!")
          }
        }
      },
      async checkCodePromo() {
        var errorElement = document.getElementById('promo-errors')
        if (!this.codePromo || this.codePromo == "" || this.codePromo == null) {
          errorElement.textContent = 'renseigner un code promo'
          return
        } else {
          errorElement.textContent = ''
        }
        const result = await this.$http.post('/check-promo', {name: this.codePromo})
        if (result.data) {
          this.getCart.promo = result.data
          this.$store.commit('updateToCart', { obj: this.getCart.promo, source: 'promo' })
          errorElement.textContent = ''
        } else {
          errorElement.textContent = 'code promo inexistant'
        }
      },
      async deleteCodePromo() {
          this.getCart.promo = null
          this.$store.commit('updateToCart', { obj: this.getCart.promo, source: 'promo' })
      },
      getSousTotalPrice() {
        const sousTotalPrice = this.getCart.products.reduce((total, item) => total + item.price * item.quantity, 0)
        return sousTotalPrice.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      },
      getTotalPrice() {
        const totalPrice = this.getCart.products.reduce((total, item) => total + item.price * item.quantity, 0)
        
        if (this.getCart.promo && this.getCart.promo.percentage) {
          const promoAmount = (totalPrice * this.getCart.promo.percentage) / 100;
          const finalPrice = totalPrice - promoAmount
          return finalPrice.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        }

        return totalPrice.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      },
      toggleModalLogin() {
        if (this.openLogin) {
          this.openLogin = false
        } else {
          this.openLogin = true
        }
      }
    },
    beforeUnmount() {
      // Clean up elements
      if (this.card) {
        this.card.unmount()
        this.card.destroy()
      }
    }
  }
  
</script>

<style>
.center {
  text-align: center;
}
.subtitle {
  font-weight: 600;
  line-height: 1.125;
  font-size: 1.2rem;
}
.subtitle2 {
  font-weight: 600;
  line-height: 1.125;
  font-size: 1rem;
  padding: 5px;
}
.border-style {
  border-radius: 5px;
  border: 1px solid #00d1b2;
}
.custom-cursor {
  cursor: pointer;
}
.button {
  margin-bottom: 10px;
}
.columns {
  margin-top: inherit;
  margin-left: inherit;
}
.columns:not(:last-child) {
  margin-bottom: inherit;
}
.column {
  padding-left: inherit;
}
.border {
  position: relative;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  padding-left: 12px;
  padding-right: 12px;
  margin-bottom: 10px;
}
.top-left {
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 10px;
  margin-right: 10px;
}
.custom-cursor {
  cursor: pointer;
}
.padding {
  padding: 10px;
}

.stripe-form {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 20px;
}

.form-control {
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  height: 38px;
  width: 100%;
  background: white;
}

.btn {
  color: white;
  background-color: #007bff;
  border-color: #007bff;
  padding: .375rem .75rem;
  border-radius: .25rem;
  font-size: 1rem;
  line-height: 1.5;
}

.btn-primary:hover {
  background-color: #0069d9;
  border-color: #0062cc;
}

#card-errors {
  color: red;
  margin-top: 10px;
}
.label {
  display: flex;
  align-items: center;
}

</style>
  