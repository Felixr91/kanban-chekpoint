<template>
  <div class="board container-fluid">
    <navbar></navbar>
    <h1 class="mt-4 fontbanger">{{title}}</h1>
    <div class="row">
      <!-- <div class="col-12 d-flex justify-content-around"> -->

      <list v-for="list in listsById" :list="list"></list>
      <!-- 
      </div> -->
    </div>
    <form @submit.prevent="addList">
      <input v-model="newList.title" type="text" name="listTitle" placeholder="List Title">
      <div>
        <button class="btn btn-success mt-1" type="submit">Add List</button>
      </div>
    </form>
  </div>
</template>

<script>
  import List from '@/components/List.vue'
  import Navbar from '@/components/NavBar.vue'
  export default {
    name: "board",
    data() {
      return {
        bId: this.$route.params.boardId,
        newList: {
          title: "",
          boardId: this.$route.params.boardId
        },
        newTask: {
          title: "",
          description: "",
          listId: this.$route.params.listId
        }
      }
    },
    created() {
      //blocks users not logged in
      if (!this.$store.state.user._id) {
        this.$router.push({ name: "login" });
      }
    },
    computed: {
      lists() {
        return this.$store.state.lists
      },
      listsById() {
        return this.$store.state.lists.filter(l => l.boardId == this.boardId)
      },
      tasks() {
        return this.$store.state.tasks
      }
    },
    mounted() {
      this.$store.dispatch("getLists", this.$route.params.boardId)
    },
    methods: {
      addList() {
        this.$store.dispatch('addList', this.newList);
        this.newList = { title: "", boardId: this.bId }
      },
      addTask() {
        this.$store.dispatch('addTask', this.newTask);
        this.newTask = { title: "", description: "", listId: this.lId }
      },
      logout() {
        this.$store.dispatch("logout")
      },
      home() {
        this.$store.dispatch("home")
      }
    },
    props: ["boardId", "title"],
    components: {
      List,
      Navbar
    }
  };
</script>

<style>
  .fontbanger {
    font-family: 'Bangers', cursive;
  }

  .board {
    height: 100vh;
  }
</style>