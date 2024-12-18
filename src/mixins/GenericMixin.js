import { mapActions } from 'vuex'
import socket from "../socket";
const myMixin = {
  data() {
    return {
      errorMessage: null,
      successMessage: null,
      customer: {
        email: null,
        password: null
      },
      openLogin:true
    }
  },
  methods: {
    ...mapActions(['updateUser']),
    async login(origin) {
      if (!this.customer.email || !this.customer.password) {
          this.errorMessage = "Veuillez remplir tous les champs."
          return
      }
      try {
          const params = {
              email: this.customer.email,
              password:  this.customer.password
          }
          const result = await this.$http.post('/auth/login', params)
          const { token } = result.data.token
          localStorage.setItem('token', token)
          const sessionId = localStorage.getItem('sessionId')
          if (sessionId) {
            socket.auth = { sessionId, token }
            socket.connect()
          }
          socket.auth = { token }
          socket.connect()  

          // this.updateUser(decodedToken)
          if (origin == 'LoginView') {
            this.$router.push('/')
          } else if (origin == 'OrderView') {
            this.openLogin = false
            this.getUserData()
          }
      } catch (e) {
        console.log('e =>', e)
          this.errorMessage = e.response.data.error
      }
    },
    async getUserData() {
      if  (this.getUser) {
        const result = await this.$http.get('/user/' + this.getUser.userId)
        this.savedCustomer = result.data
        this.customer = result.data
      }
    },
    async sendResetRequest() {
      if (!this.customer.email) {
          this.errorMessage = "Veuillez remplir l'email"
          return
      }
      const params = { email: this.customer.email }
      try {
          const response = await this.$http.post('/user/reset-password', params)
          this.successMessage = response.data.message
          this.errorMessage = ''
      } catch (error) {
          this.errorMessage = error
          this.successMessage = ''
      }
    }
  }
}
  
export default myMixin