<template>
  <div class="">
    <div class="row nav-background">
      <div class="col-12 nav justify-content-between align-items-center">
        <h4 class="fontlogo font-size ml-3 mt-1 hover" @click="home">Holla!</h4>
        <button v-if="user._id" class="btn btn-outline-light hover h-75" @click="logout">Logout</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Navbar',
    data() {
      return {
        loggedIn: false
      }
    },
    computed: {
      user() {
        return this.$store.state.user
      }
    },
    methods: {
      home() {
        this.$store.dispatch("home")
      },
      logout() {
        this.$store.dispatch("logout")
      },
    }
  }

</script>

<style>
  .action {
    cursor: pointer;
  }

  .login {
    height: 100vh;
  }

  .nav-background {
    background-color: transparent !important;
    height: 10vh;
    color: white;
  }

  .font-size {
    font-size: 50px;
  }
</style>