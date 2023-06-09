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
    export default {
    data() {
        return {
            newPassword: null
        }
    },
    methods: {
        ...mapActions(['updateUser']),
        resetPassword() {
            try {
                const resetToken = this.$route.params.id
                console.log('resetToken =>', resetToken)
                const result = this.$http.post('/user/reset-password/' + resetToken, { newPassword: this.newPassword, token: resetToken})
                console.log(result)
            } catch (e){
                this.errorMessage = e
            }
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