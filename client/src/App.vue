<template>
  <div id="app">

    <router-view />
  </div>
</template>

<style>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  .fontlogo {
    font-family: 'Bangers', cursive;
  }

  body {
    background-image: linear-gradient(to top, #e3f808, #b0ec42, #83dd60, #5dcc75, #42b983);
    height: 100vh;
    background-repeat: no-repeat;
    background-attachment: fixed;
    /* background-repeat: no-repeat; */
    /* background-size: cover; */
    /* position: absolute; */
  }
</style>