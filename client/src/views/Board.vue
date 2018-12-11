<template>
  <div class="board">
    {{boardId}}
    <h1>Lists:</h1>
    <list v-for="list in lists" :list="list">
    </list>
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
      }
    },
    mounted() {
      this.$store.dispatch("getLists", this.boardId)
    },
    methods: {
      addList() {
        this.$store.dispatch('addList', this.newList);
        this.newList = { title: "", boardId: this.bId }
      }
    },
    props: ["boardId"],
    components: {
      List
    }
  };
</script>