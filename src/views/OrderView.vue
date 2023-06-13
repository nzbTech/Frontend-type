<template>
  <div class="home">
    <h1 class="title">Checkout</h1>
      <div class="notification is-primary text-align-center">
          C'est un exemple de notification Bulma.
      </div>
    <div class="columns">
      <div class="column is-half">
        <div class="customer-info">
          <h1>Informations client</h1>
          <template v-if="getUser">
            <form>
              {{ getUser }}
              <div class="field">
                <label class="label" for="firstName">Prénom:</label>
                <div class="control">
                  <input class="input" type="text" id="firstName" v-model="getUser.firstname" required>
                </div>
              </div>
              <div class="field">
                <label class="label" for="lastName">Nom:</label>
                <div class="control">
                  <input class="input" type="text" id="lastName" v-model="getUser.lastname" required>
                </div>
              </div>
              <!-- <div class="field">
                <label class="label" for="address">Adresse:</label>
                <div class="control">
                  <input class="input" type="text" id="address" v-model="getUser.address" required>
                </div>
              </div>
              <div class="field">
                <label class="label" for="city">Ville:</label>
                <div class="control">
                  <input class="input" type="text" id="city" v-model="getUser.city" required>
                </div>
              </div>
              <div class="field">
                <label class="label" for="postalCode">Code Postal:</label>
                <div class="control">
                  <input class="input" type="text" id="postalCode" v-model="getUser.zipcode" required>
                </div>
              </div> -->
            </form>
            <button class="button" @click="login">Connexion</button>
          </template>
          <template v-else>
            <form>
              <div class="field">
                <label class="label" for="firstName">Prénom:</label>
                <div class="control">
                  <input class="input" type="text" id="firstName" v-model="customer.firstname" required>
                </div>
              </div>
              <div class="field">
                <label class="label" for="lastName">Nom:</label>
                <div class="control">
                  <input class="input" type="text" id="lastName" v-model="customer.lastname" required>
                </div>
              </div>
              <div class="field">
                <label class="label" for="address">Adresse:</label>
                <div class="control">
                  <input class="input" type="text" id="address" v-model="customer.address" required>
                </div>
              </div>
              <div class="field">
                <label class="label" for="city">Ville:</label>
                <div class="control">
                  <input class="input" type="text" id="city" v-model="customer.city" required>
                </div>
              </div>
              <div class="field">
                <label class="label" for="postalCode">Code Postal:</label>
                <div class="control">
                  <input class="input" type="text" id="postalCode" v-model="customer.zipcode" required>
                </div>
              </div>
            </form>
          </template>
        </div>
      </div>
      <div class="column is-half">
        <div class="cart-summary">
          <h2>Récapitulatif du panier</h2>
          <ul>
            <li v-for="item in getCart.items" :key="item.id">
              {{ item.name }} - {{ item.price }} €  x {{ item.quantity }} ({{ item.price *  item.quantity }} €)
            </li>
          </ul>
          <p>Total: {{ getTotalPrice() }} €</p>
          <div class="field">
            <label class="label" for="promoCode">Code promo:</label>
            <div class="control">
              <input class="input" type="text" id="promoCode" v-model="promoCode">
            </div>
          </div>
          <button class="button" @click="applyPromoCode">Vérifier le code promo</button>
        </div>
        <div class="payment-form">
          <h2>Formulaire de carte de paiement</h2>
          <form>
            <div class="field">
              <label class="label" for="cardNumber">Numéro de carte:</label>
              <div class="control">
                <input class="input" type="text" id="cardNumber" v-model="cardNumber" required>
              </div>
            </div>
            <div class="field">
              <label class="label" for="expiryDate">Date d'expiration:</label>
              <div class="control">
                <input class="input" type="text" id="expiryDate" v-model="expiryDate" required>
              </div>
            </div>
            <div class="field">
              <label class="label" for="cvv">CVV:</label>
              <div class="control">
                <input class="input" type="text" id="cvv" v-model="cvv" required>
              </div>
            </div>
          </form>
          <button class="button" @click="submitForm">Envoyer le formulaire</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  // import { loadStripe } from "@stripe/stripe-js"
  
  export default {
    data() {
      return {
        stripe: null,
        elements: null,
        card: null,
        cardholderName: '',
        cardholderEmail: '',
        customer: {
          firstName: '',
          lastName: '',
          address: '',
          city: '',
          postalCode: ''
        },
      }
    },
    computed: {
      ...mapGetters(['getCart','getUser'])
    },
    async mounted() {
      // await this.getPreOrder()
      // this.stripe = await loadStripe(process.env.VUE_APP_STRIPE_PUBLIC_KEY)
      // this.elements = this.stripe.elements()
      // this.card = this.elements.create('card')
      // this.card.mount('#card-element')
  
      // this.card.on('change', function(event) {
      //   var displayError = document.getElementById('card-errors')
      //   if (event.error) {
      //     displayError.textContent = event.error.message
      //   } else {
      //     displayError.textContent = ''
      //   }
      // })
      // Vous pouvez maintenant utiliser `this.stripe` dans les autres méthodes de ce composant
    },
    methods: {
      getTotalPrice() {
        return this.getCart.items.reduce((total, item) => total + item.price * item.quantity, 0)
      },
      async submitPayment() {
        // Get payment intent from backend
        const response = await fetch('http://localhost:3000/api/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            total: 1000,  // En centimes
            email: this.cardholderEmail,
            items: [
              {
                id: 'item1',
                quantity: 1,
              },
              {
                id: 'item2',
                quantity: 3,
              },
            ],
          })
        })
        const data = await response.json()
        console.log('data ==>', data)
        console.log('data.clientSecret ==>', data.client_secret)
        // Confirm the card payment
        console.log('this.card =>', this.card)
        const result = await this.stripe.confirmCardPayment(data.client_secret, {
          payment_method: {
            card: this.card,
            billing_details: {
              name: 'leger',
              email: 'guillaumeleger140@gmail.com'
            }
          }
        })
  
        if (result.error) {
          // Inform the user if there was an error
          var errorElement = document.getElementById('card-errors')
          errorElement.textContent = result.error.message
        } else {
          // Payment has been processed
          if (result.paymentIntent.status === 'succeeded') {
            console.log("Payment processed successfully!")
          }
        }
      },
      // async getPreOrder() {
      //   try {
      //       console.log('preOrder data =>')
      //       const shopcart = localStorage.getItem('cart')
      //       const result = await this.$http.get(`/pre-order/?${shopcart}`)
      //       console.log('result =>', result)
      //   } catch (e) {
      //       console.log(e)
      //   }

      // }
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
  