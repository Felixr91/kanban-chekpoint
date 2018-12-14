<template>
  <div class="login container-fluid">
    <navbar></navbar>
    <!-- <div class="row nav-background">
      <div class="col-12 nav">
        <h4 class="fontlogo font-size ml-3 mt-1" @click="home">Holla!</h4>
      </div>
    </div> -->

    <div class="row d-flex justify-content-center mt-5">
      <div class="col-12 fontbanger mb-3">
        <h1>Login to see your boardz, dog!</h1>
      </div>
      <div>
        <form v-if="loginForm" @submit.prevent="loginUser">
          <input type="email" v-model="creds.email" placeholder="email" class="mr-2">
          <input type="password" v-model="creds.password" placeholder="password" class="mr-2">
          <button class="btn btn-warning" type="submit">Login</button>
        </form>
        <form v-else @submit.prevent="register">
          <input type="text" v-model="newUser.name" placeholder="name">
          <input type="email" v-model="newUser.email" placeholder="email">
          <input type="password" v-model="newUser.password" placeholder="password">
          <button type="submit">Create Account</button>
        </form>
      </div>
    </div>
    <div class="row d-flex justify-content-center">
      <div class="action" @click="loginForm = !loginForm">
        <p v-if="loginForm">No account? Click here to Register</p>
        <p v-else>Already have an account? Click here to Login</p>
      </div>
    </div>

    <div class="row">
      <div class="col-12 mt-5">
        <img :src="logo" style="height: 200px" alt="logo">
      </div>
    </div>

  </div>
</template>

<script>
  import logo from "../../assets/hollalogo.png"
  import Navbar from "@/components/NavBar.vue"
  export default {
    name: "login",
    data() {
      return {
        loginForm: true,
        creds: {
          email: "",
          password: ""
        },
        newUser: {
          email: "",
          password: "",
          name: ""
        },
        logo: logo
      };
    },
    methods: {
      register() {
        this.$store.dispatch("register", this.newUser);
      },
      loginUser() {
        this.$store.dispatch("login", this.creds);
      },
      home() {
        this.$store.dispatch("home")
      }
    },
    components: {
      Navbar
    }
  };
</script>

<style>
  .action {
    cursor: pointer;
  }

  .login {
    height: 100vh;
  }

  .nav-background {
    background-color: rgb(135, 214, 141);
    height: 10vh;
    color: white;
  }

  .font-size {
    font-size: 50px;
  }

  .fontbanger {
    font-family: 'Bangers', cursive;
    color: black;
  }
</style>