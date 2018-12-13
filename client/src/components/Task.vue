<template>
  <div class="">
    <h5>{{ editedTask.title ||task.title}}</h5>
    <p>{{ editedTask.description ||task.description}}</p>
    <i class="fas fa-pencil-alt ml-1 hover" @click="taskChange=!taskChange"></i>
    <i class="fas fa-times-circle ml-2 hover" @click="deleteTask(task._id)"></i>
    <!-- adding comments -->
    <div class="mt-2">
      <a @click="commentOption=!commentOption" class="hover"><u>comment...</u></a>
    </div>
    <div v-if="commentOption">
      <form @submit.prevent="addComment">
        <input type="text" placeholder="comment" v-model="newComment.description">
        <button type="submit" class="btn btn-success mt-2">comment</button>
      </form>
    </div>
    <!-- <div>
      <a href="#" data-toggle="popover" title="Popover Header" data-content="Some content inside the popover">Toggle
        popover</a>
    </div> -->
    <!-- TASK EDITING FORM -->
    <div class="card-header" v-if="taskChange">
      <form @submit.prevent="editTask">
        <input type="text" placeholder="New Title" v-model="editedTask.title">
        <input type="text" placeholder="New Description" v-model="editedTask.description">
        <button type="submit" class="btn btn-success mt-2">Edit Task</button>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Task',
    data() {
      return {
        bId: this.$route.params.boardId,
        newTask: {
          title: "",
          description: "",
          listId: this.$route.params.listId
        },
        editedTask: {
          title: "",
          description: "",
          listId: this.$route.params.listId,
          taskId: this.task._id

        },
        newComment: {
          description: "",
          taskId: "",
          boardId: ""
          // authorId: ""
        },
        taskChange: false,
        commentOption: false
      }
    },
    computed: {
      tasks() {
        return this.$store.state.tasks
      },
      tasksById() {
        return this.$store.state.tasks.filter(t => t.listId == this.list._id)
      },
      //make a computed for our comments
    },
    props: ["task"],
    methods: {
      deleteTask(taskId) {
        this.$store.dispatch('deleteTask', taskId)
      },
      editTask(taskId) {
        this.editedTask.listId = this.task.listId
        this.$store.dispatch('editTask', this.editedTask)
      },
      addComment() {
        this.newComment.boardId = this.bId
        this.newComment.taskId = this.task._id
        this.$store.dispatch('addComment', this.newComment)
        // this.newComment = { description: "" }
      }
    }
  }

</script>

<style>
  .hover {
    cursor: pointer;
  }
</style>