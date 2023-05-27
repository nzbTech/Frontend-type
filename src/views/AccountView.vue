<template>
    <div class="app">
        <h1 class="title">Profil</h1>
        <div class="notification is-primary text-align-center">
            C'est un exemple de notification Bulma.
        </div>
      <nav class="navbar">
        <div class="navbar-brand">
          <a class="navbar-item" @click="toggleMobileMenu">
            <span class="icon">
              <i class="fas fa-bars"></i>
            </span>
          </a>
        </div>
        <div class="navbar-menu" :class="{ 'is-active': isMobileMenuOpen }">
          <div class="navbar-start">
            <router-link to="/commands" class="navbar-item">Mes commandes</router-link>
            <router-link to="/cart" class="navbar-item">Mon panier</router-link>
            <router-link to="/profile" class="navbar-item">Mon profil</router-link>
          </div>
        </div>
      </nav>
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
  </template>
  
<script>
export default {
data() {
    return {
    user: {
        username: '',
        email: '',
        password: ''
    },
    isMobileMenuOpen: false
    };
},
methods: {
    saveUser() {
    // Effectuez ici votre logique de sauvegarde des données utilisateur
    console.log('Données utilisateur enregistrées', this.user);
    },
    toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    }
}
};
</script>
  
<style>

.navbar-item {
color: #333;
}


@media screen and (max-width: 768px) {
.navbar-menu {
    display: none;
}

.is-active .navbar-menu {
    display: block;
}
}
</style>
  