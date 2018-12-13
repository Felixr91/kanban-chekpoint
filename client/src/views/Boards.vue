<template>
  <div class="boards container-fluid">
    <!-- NAV BAR -->
    <navbar></navbar>

    <!-- YOUR BOARDS TITLE -->
    <h1 class="mb-3 mt-5 fontbanger">YOUR BOARDS!</h1>
    <!-- NEW BOARD BUTTON  -->
    <button class="btn btn-success" @click="showCreate=!showCreate">New Board</button>

    <!-- ADD A BOARD FORM -->
    <form @submit.prevent="addBoard" v-if="showCreate">
      <div>
        <input type="text" placeholder="Title" v-model="newBoard.title" class="mb-2" style="width: 20rem" required>
      </div>
      <div>
        <input type="text" placeholder="Description" v-model="newBoard.description" style="width: 20rem">
      </div>
      <div>
        <button type="submit" class="btn btn-success mt-2">Create Board</button>
      </div>
    </form>

    <!--BOARD CARDS -->
    <div class="row d-flex justify-content-around">
      <div v-for="board in boards" :key="board._id" class="mt-5">
        <div class="card" style="width: 15rem">
          <div class="card-header d-flex justify-content-between">
            <!-- you can pass a prop through a router link -->
            <router-link :to="{name: 'board', params: {boardId: board._id, title: board.title}}">{{board.title}}</router-link>
            <i class="fas fa-trash-alt ml-2 hover" @click="deleteBoard(board._id)"></i>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item d-flex justify-content-start">{{board.description}}</li>
          </ul>
        </div>
      </div>
    </div>
    <!-- <button @click="deleteBoard(board._id)">DELETE BOARD</button> -->
  </div>
</template>

<script>
  import Navbar from "@/components/NavBar.vue"
  export default {
    name: "boards",
    created() {
      //blocks users not logged in
      if (!this.$store.state.user._id) {
        this.$router.push({ name: "login" });
      }
    },
    mounted() {
      this.$store.dispatch("getBoards");
    },
    data() {
      return {
        newBoard: {
          title: "",
          description: ""
        },
        showCreate: false
      };
    },
    computed: {
      boards() {
        return this.$store.state.boards;
      }
    },
    methods: {
      addBoard() {
        this.$store.dispatch("addBoard", this.newBoard);
        this.newBoard = { title: "", description: "" };
        this.showCreate = false
      },
      deleteBoard(boardId) {
        this.$store.dispatch("deleteBoard", boardId);
      },
      logout() {
        this.$store.dispatch("logout")
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
  .card {
    background-color: rgb(175, 190, 212)
  }

  .fontbanger {
    font-family: 'Bangers', cursive;
  }

  .boards {
    height: 100vh;
  }
</style>