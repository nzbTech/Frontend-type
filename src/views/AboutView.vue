<template>
  <div>
    <form @submit.prevent="submitPayment">
      <div>
        <label for="name">Name</label>
        <input id="name" type="text" v-model="cardholderName">
      </div>
      <div>
        <label for="email">Email</label>
        <input id="email" type="text" v-model="cardholderEmail">
      </div>
      <div id="card-element"></div>
      <button type="submit">Submit Payment</button>
    </form>
    <div id="card-errors" role="alert"></div>
  </div>
</template>

<script>
import { loadStripe } from "@stripe/stripe-js";

export default {
  data() {
    return {
      stripe: null,
      elements: null,
      card: null,
      cardholderName: '',
      cardholderEmail: ''
    };
  },
  async mounted() {
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
