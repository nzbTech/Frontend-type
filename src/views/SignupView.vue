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
                        <label class="label">Nom d'utilisateur</label>
                        <div class="control">
                            <input class="input" type="text" v-model="username" placeholder="Guillaume" required>
                        </div>
                        </div>
                        <div class="field is-left">
                        <label class="label is-left">Adresse e-mail</label>
                        <div class="control">
                            <input class="input" type="email" v-model="email" placeholder="guillaume@gmail.com" required>
                        </div>
                        </div>
                        <div class="field">
                        <label class="label is-left">Mot de passe</label>
                        <div class="control">
                            <input class="input" type="password" v-model="password" placeholder="*******" required>
                        </div>
                        </div>
                        <div class="field">
                        <div class="control">
                            <button class="button is-primary is-fullwidth">Créer un compte</button>
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
    username: '',
    email: '',
    password: ''
    };
},
methods: {
    signup() {
    // Logique de création de compte ici
    // Vous pouvez envoyer les données du formulaire au serveur ou gérer la création de compte localement
    console.log('Création de compte avec nom d\'utilisateur:', this.username);
    }
}
};
</script>
  
<style scoped>
.signup-page {
height: 100vh;
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
