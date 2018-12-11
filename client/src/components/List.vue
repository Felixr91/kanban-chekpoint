<template>
  <div>
    {{list.title}}
    <button @click="deleteList(list._id)">Delete</button>

    <task></task>
  </div>
</template>

<script>
  import Task from "@/components/Task.vue"
  export default {
    name: 'List',
    data() {
      return {}
    },
    computed: {
      // lists() {
      //   return this.$store.state.lists
      // }
    },
    mounted() {

    },
    methods: {
      deleteList(listId) {
        this.$store.dispatch('deleteList', listId)
      }
    },
    props: ["list"],
    components: {
      Task
    }

  }
</script>

<style scoped>
</style>