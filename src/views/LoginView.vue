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
                        <label class="label">Email</label>
                        <div class="control has-icons-left">
                            <input 
                                type="email" 
                                placeholder="guillaume@gmail.com" 
                                class="input" 
                                required
                                v-model="email">
                            <span class="icon is-small is-left">
                            <i class="fa fa-envelope"></i>
                            </span>
                        </div>
                        </div>
                        <div class="field">
                        <label class="label">Password</label>
                        <div class="control has-icons-left">
                            <input 
                                type="password" 
                                placeholder="*******" 
                                class="input" 
                                required
                                v-model="password">
                            <span class="icon is-small is-left">
                            <i class="fa fa-lock"></i>
                            </span>
                        </div>
                        </div>
                        <div class="field">
                        <label class="checkbox">
                            <input type="checkbox">
                        Remember me
                        </label>
                        </div>
                        <div v-if="errorMessage" class="error-message">
                            {{ errorMessage }}
                        </div>
                        <div class="field">
                        <button 
                            class="button"
                            @click="login">
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
    import { mapActions } from 'vuex'
    export default {
    data() {
        return {
            email: null,
            password: null,
            errorMessage: null
        }
    },
    methods: {
        ...mapActions(['updateUser']),
        async login() {
            try {
                const params = {
                    email: this.email,
                    password:  this.password
                }
                const result = await this.$http.post('/user/login', params)
                const { token, userId } = result.data
                localStorage.setItem('token', token)
                this.updateUser({ userId })
                this.$router.push('/')
            } catch (e) {
                this.errorMessage = e.response.data.error
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