<template>
    <div>
      <h1>Réinitialisation du mot de passe</h1>
      <form @submit="resetPassword">
        <input type="password" v-model="newPassword" placeholder="Nouveau mot de passe" required>
        <button type="submit">Réinitialiser le mot de passe</button>
      </form>
    </div>
</template>
  
<script>
    import { mapActions } from 'vuex'
    import axios from 'axios'
    export default {
    data() {
        return {
            newPassword: null
        }
    },
    methods: {
        ...mapActions(['updateUser']),
        async resetPassword() {
          // try {
          //     const resetToken = this.$route.query.token
              
          //     const test = decodeURIComponent(resetToken)
          //     console.log('test =>', test)
          //     console.log('resetToken =>', resetToken)
          //     const result =  this.$http.post('/auth/reset-password/2/' + resetToken, { newPassword: this.newPassword})
          //     console.log('result =>', result)

          // } catch (e){
          //     this.errorMessage = e
          // }
          const url = this.$route.query.token
          axios.post(url, {password: this.newPassword})
          .then(response => {
            console.log(response.data)
          })
          .catch(error => {
            console.error('Erreur lors de la requête POST:', error)
          })
        }
    }
}
</script>
  

<style scoped>
.login-page {
height: 100vh;
display: flex;
align-items: center;
justify-content: center;
background-color: #f5f5f5;
}
.box {
padding: 2rem;
}
.button {
background-color: #00d1b2;
border-color: #00d1b2;
color: #f5f5f5;
margin-top: 1.5rem;
}
</style>