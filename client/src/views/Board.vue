<template>
  <div class="board container">
    <!-- {{boardId}} -->
    <div class="row">
      <div class="col-12 d-flex justify-content-end">
        <button @click="home">Home</button>
        <button @click="logout">Logout</button>
      </div>
    </div>
    <h1>Lists:</h1>
    <div d-flex justify-content-center>
      <div class="row">
        <list v-for="list in lists" :list="list"></list>
      </div>
    </div>
    <form @submit.prevent="addList">
      <input v-model="newList.title" type="text" name="listTitle" placeholder="List Title">
      <button type="submit">Add List</button>
    </form>
  </div>
</template>

<script>
  import List from '@/components/List.vue'
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
      tasks() {
        return this.$store.state.tasks
      }
    },
    mounted() {
      this.$store.dispatch("getLists", this.boardId)
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
    props: ["boardId"],
    components: {
      List
    }
  };
</script>