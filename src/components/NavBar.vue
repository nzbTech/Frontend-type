<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item" href="https://bulma.io">
            <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
            </a>

            <a role="button" class="navbar-burger" data-target="navMenu" aria-label="menu" aria-expanded="false">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            </a>
        </div>
        <div class="navbar-menu" id="navMenu">
            <div class="navbar-start">
                <a class="navbar-item">
                    <router-link to="/">Home</router-link>
                </a>
                <a class="navbar-item">
                    <router-link to="/about">About</router-link>
                </a>
            </div>
            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                        <div v-if="!getUser">
                            <router-link class="button" to="/signup">
                                <strong>Sign up</strong>
                            </router-link>
                            <router-link class="button" to="/login">
                                <strong>Login</strong>
                            </router-link>
                        </div>
                        <div v-else>
                            <router-link class="button" to="/profil">
                                <strong>Profil</strong>
                            </router-link>
                            <div class="button" @click="logout">
                                <strong>Logout</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(['getUser'])
  },
  mounted() {
  },
  methods: {
    async logout() {
        localStorage.removeItem('token')
        this.$store.dispatch('updateUser', null);
    },
  }
}
</script>

<style>
/* .router-link-active,
.router-link-exact-active {
    color: inherit !important;
} */

a.navbar-item:focus, a.navbar-item:focus-within, a.navbar-item:hover, a.navbar-item.is-active, .navbar-link:focus, .navbar-link:focus-within, .navbar-link:hover, .navbar-link.is-active {
    background-color: inherit;
}


nav a.router-link-exact-active {
    color: inherit;
}
</style>