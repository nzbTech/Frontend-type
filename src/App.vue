<template>
  <div class="container">
    <NavBar></NavBar>
    <router-view/>
  </div>
</template>

<script>
import socket from "./socket";

export default {
  name: 'App',
  data() {
    return {
      usernameAlreadySelected: false,
    };
  },
  methods: {
  },
  created() {
    const token = localStorage.getItem('token')
    if (token) {
      const sessionId = localStorage.getItem('sessionId')
      if (sessionId) {
        socket.auth = { sessionId, token }
        socket.connect()
      } else {
        socket.auth = { token }
        socket.connect()
      }
    }
    socket.on('session', ({ sessionId }) => {
      localStorage.setItem('sessionId', sessionId)
    })
    // socket.on('test', ({ message }) => {
    //   console.log('message', message)
    // })
  },
  unmounted() {
    socket.off("connect_error")
  },
}
</script>


<style>

.title {
    text-align: center;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #00d1b2;
}
</style>
