<template>
    <div class="home">
        <h1 class="title">Connexion</h1>
        <div class="notification is-primary text-align-center">
            C'est un exemple de notification Bulma.
        </div>
        <section class="hero is-one-third">
            <div class="hero-body">
                <div class="container">
                <div class="columns is-centered">
                    <div class="column is-4-tablet is-4-desktop is-3-widescreen">
                    <form action="" class="box">
                        <div class="field">
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
                        <div class="field">
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
                        <div class="field">
                        <label class="checkbox">
                            <input type="checkbox">
                        Se souvenir de moi
                        </label>
                        </div>
                        <div>
                            <form @submit="sendResetRequest">
                            <button type="submit">J'ai oublié mon mot de passe</button>
                            </form>
                            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
                            <p v-else-if="successMessage" class="success-message">{{ successMessage }}</p>
                        </div>
                        <div v-if="errorMessage" class="error-message">
                            {{ errorMessage }}
                        </div>
                        <div class="field">
                        <button 
                            class="button"
                            @click="test()">
                            Se connecter
                        </button>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
            </div>
        </section>
    </div>
</template>
  
<script>
    export default {
    data() {
        return {
            origin:'LoginView',
            email: null,
        }
    },
    methods: {
      async test () {
        await this.$http.get('/auth/redirect')
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

.error-message {
  color: red;
}

.success-message {
  color: green;
}
</style>