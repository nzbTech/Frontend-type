<template>
    <div class="home">
        <h1 class="title">Login</h1>
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
                        <label for="" class="label">Email</label>
                        <div class="control has-icons-left">
                            <input type="email" placeholder="guillaume@gmail.com" class="input" required>
                            <span class="icon is-small is-left">
                            <i class="fa fa-envelope"></i>
                            </span>
                        </div>
                        </div>
                        <div class="field">
                        <label for="" class="label">Password</label>
                        <div class="control has-icons-left">
                            <input type="password" placeholder="*******" class="input" required>
                            <span class="icon is-small is-left">
                            <i class="fa fa-lock"></i>
                            </span>
                        </div>
                        </div>
                        <div class="field">
                        <label for="" class="checkbox">
                            <input type="checkbox">
                        Remember me
                        </label>
                        </div>
                        <div class="field">
                        <button class="button">
                            Login
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
    username: '',
    password: ''
    };
},
methods: {
    login() {
    // Logique de connexion ici
    // Vous pouvez envoyer les données d'identification au serveur ou gérer la connexion localement
    console.log('Connexion avec nom d\'utilisateur:', this.username);
    }
}
};
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