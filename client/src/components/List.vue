<template>
  <div>
    <div class="card mb-3 mt-3 mr-5" style="width: 18rem;">
      <div class="card-header">
        {{newTitle.listTitle || list.title}}
        <i class="fas fa-pencil-alt ml-1 hover" @click="edit=!edit"></i>
        <i class="fas fa-trash-alt ml-2 hover" @click="deleteList(list._id)"></i>
      </div>

      <!-- LIST TITLE EDIT INVISIBLE ROW -->
      <div class="card-header" v-if="edit">
        <form @submit.prevent="editList">
          <!-- vmodel changes data value -->
          <input type="text" placeholder="New Title" v-model="newTitle.listTitle">
          <button class="btn btn-success ml-2" type="submit">save</button>
        </form>
      </div>

      <!-- TASK LOCATION ROW -->
      <ul class="list-group list-group-flush">
        <Task v-for="task in tasksById" :task="task" class="list-group-item"></Task>
        <li class="list-group-item bg-warning">add a task <i class="fas fa-plus-circle hover" @click="createTask=!createTask"></i></li>

        <!-- TASK ADDITION INVISIBLE ROW -->
        <div class="card-header" v-if="createTask">
          <form @submit.prevent="addTask">
            <input type="text" placeholder="Task Title" v-model="newTask.title">
            <input type="text" placeholder="Task Description" v-model="newTask.description">
            <button type="submit" class="btn btn-success mt-2">Add Task</button>
          </form>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
  import Task from "@/components/Task.vue"
  export default {
    name: 'List',
    data() {
      return {
        // lId: this.$route.params.listId,
        bId: this.$route.params.boardId,
        newTitle: {
          listTitle: "",
          listId: this.list._id
        },
        newTask: {
          title: "",
          description: ""
        },
        edit: false,
        createTask: false
      }
    },
    computed: {
      // lists() {
      //   return this.$store.state.lists
      // }
      tasks() {
        return this.$store.state.tasks
      },
      tasksById() {
        return this.$store.state.tasks.filter(t => t.listId == this.list._id)
      }
    },
    mounted() {
      this.$store.dispatch('getAllTasks', this.list._id)
    },
    methods: {
      //LIST METHODS
      deleteList(listId) {
        this.$store.dispatch('deleteList', listId)
      },
      editList(listId) {
        this.$store.dispatch('editList', this.newTitle)
        this.edit = false
      },
      // TASK METHODS
      addTask() {
        this.newTask.boardId = this.bId
        this.newTask.listId = this.list._id
        this.$store.dispatch('addTask', this.newTask);
        this.newTask = { title: "", description: "" }
        this.createTask = false
      }
    },
    props: ["list"],
    components: {
      Task
    }

  }
</script>

<style scoped>
  .hover {
    cursor: pointer;
  }
</style>