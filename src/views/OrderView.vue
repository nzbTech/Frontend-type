<template>
  <div class="payment-terminal">
    <div class="container">
      <h1 class="title">Checkout</h1>
      <div class="notification is-primary text-align-center">
          C'est un exemple de notification Bulma.
      </div>
      <div class="columns">
        <div class="column">
          <div class="payment-form">
            <h2>Informations de Paiement</h2>

            <div class="field">
              <label class="label">Nom du titulaire de la carte</label>
              <div class="control">
                <input class="input" type="text" v-model="cardHolderName" placeholder="Entrez le nom du titulaire">
              </div>
            </div>

            <div class="field">
              <label class="label">Numéro de carte</label>
              <div class="control">
                <div id="card-element" class="input"></div>
              </div>
            </div>

            <div class="field">
              <label class="label">Date d'expiration</label>
              <div class="control">
                <input class="input" type="text" v-model="expirationDate" placeholder="MM/AA">
              </div>
            </div>

            <div class="field">
              <label class="label">Code de sécurité</label>
              <div class="control">
                <input class="input" type="text" v-model="securityCode" placeholder="CVC">
              </div>
            </div>

            <div class="field">
              <label class="label">Montant à payer</label>
              <div class="control">
                <input class="input" type="text" v-model="amount" placeholder="Montant">
              </div>
            </div>

            <div class="field">
              <div class="control">
                <button class="button is-primary" @click="processPayment">Payer</button>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-two-thirds">
          <div class="cart-summary">
            <h2>Récapitulatif du panier</h2>
            <ul>
              <li v-for="item in getCart" :key="item.id">{{ item.name }} - {{ item.price }}€</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
  import { mapGetters } from 'vuex'
  import { loadStripe } from "@stripe/stripe-js"
  
  export default {
    data() {
      return {
        stripe: null,
        elements: null,
        card: null,
        cardholderName: '',
        cardholderEmail: ''
      }
    },
    computed: {
      ...mapGetters(['getCart'])
    },
    async mounted() {
      // await this.getPreOrder()
      this.stripe = await loadStripe(process.env.VUE_APP_STRIPE_PUBLIC_KEY)
      this.elements = this.stripe.elements()
      this.card = this.elements.create('card')
      this.card.mount('#card-element')
  
      this.card.on('change', function(event) {
        var displayError = document.getElementById('card-errors')
        if (event.error) {
          displayError.textContent = event.error.message
        } else {
          displayError.textContent = ''
        }
      })
      // Vous pouvez maintenant utiliser `this.stripe` dans les autres méthodes de ce composant
    },
    methods: {
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
  