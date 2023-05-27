<template>
    <div class="home">
        <h1 class="title">Signup</h1>
        <div class="notification is-primary text-align-center">
            C'est un exemple de notification Bulma.
        </div>
        <div class="signup-page">
            <div class="container">
                <div class="columns is-centered">
                <div class="column is-4-tablet is-4-desktop is-3-widescreen">
                    <div class="box">
                    <form @submit.prevent="signup">
                        <div class="field">
                        <label class="label">Prénom</label>
                        <div class="control">
                            <input class="input" type="text" v-model="firstname" placeholder="Guillaume">
                        </div>
                        </div>
                        <div class="field">
                        <label class="label">Nom</label>
                        <div class="control">
                            <input class="input" type="text" v-model="lastname" placeholder="Leger">
                        </div>
                        </div>
                        <div class="field">
                        <label class="label is-left">Adresse e-mail</label>
                        <div class="control">
                            <input class="input" type="email" v-model="email" placeholder="guillaume@gmail.com">
                        </div>
                        </div>
                        <div class="field">
                        <label class="label">Mot de passe</label>
                        <div class="control">
                            <input class="input" type="password" v-model="password" placeholder="*******">
                        </div>
                        </div>
                        <div class="field">
                        <div v-if="errorMessage" class="error-message">
                            {{ errorMessage }}
                        </div>
                        <div class="control">
                            <button 
                                class="button is-primary is-fullwidth"
                                @click="signup">Créer un compte</button>
                        </div>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            firstname: null,
            lastname: null,
            email: null,
            password: null,
            errorMessage: null
        }
    },
    methods: {
        async signup() {
            try {
                if (!this.firstname || !this.lastname || !this.email || !this.password) {
                    this.errorMessage = "Veuillez remplir tous les champs."
                return
                }
                const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
                    if (!emailRegex.test(this.email)) {
                this.errorMessage = "Veuillez entrer une adresse email valide."
                return
                }
                const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])(?=.{8,})/
                    if (!PASSWORD_REGEX.test(this.password)) {
                this.errorMessage = "Le mot de passe doit contenir au moins 8 caractères, dont au moins une lettre et un chiffre."
                return
                }
                const params = {
                    firstname: this.firstname,
                    name:  this.name,
                    email: this.email,
                    password:  this.password
                }
                await this.$http.post('/user/signup', params)
                this.$router.push('/login')
            } catch (error) {
                console.error(error)
            }
        }
    }
}
</script>
  
<style scoped>
.signup-page {
display: flex;
justify-content: center;
padding: 3rem 3rem;
}

.is-left {
text-align: inherit;
}
.box {
padding: 2rem;
}

.button {
margin-top: 1.5rem;
}
</style>
