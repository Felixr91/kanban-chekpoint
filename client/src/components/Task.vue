<template>
  <div class="">
    <h5>{{ editedTask.title ||task.title}}</h5>
    <p class="mb-0">{{ editedTask.description ||task.description}}</p>
    <div class="mt-1 mb-1">
      <i class="fas fa-pencil-alt ml-1 hover" @click="taskChange=!taskChange"></i>
      <i class="fas fa-times-circle ml-2 hover" @click="deleteTask(task._id)"></i>
    </div>
    <!-- Where comments WILL SHOW -->
    <div>
      <div class="btn-group dropright">
        <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"
          aria-expanded="false">
          Show Comments
        </button>
        <div class="dropdown-menu">
          <div class="pl-2 pb-1">
            <comment v-for="comment in commentsById" :comment="comment"></comment>
          </div>
          <!-- Dropdown menu links -->
          <!-- adding comments -->
          <!-- <div class="mt-2">
            <a @click="commentOption=!commentOption" class="hover"><u>Add comment...</u></a>
          </div> -->
          <div>
            <form @submit.prevent="addComment" class="pl-2 pr-2">
              <input type="text" placeholder="add comment" v-model="newComment.description">
              <div class="d-flex justify-content-center">
                <button type="submit" class="btn btn-success mt-2">add comment</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>


    <!-- MOVING TASKS -->
    <div class="dropdown mt-2">
      <button class="btn btn-secondary dropdown-toggle btn-sm" type="button" id="dropdownMenuButton" data-toggle="dropdown"
        aria-haspopup="true" aria-expanded="false">
        Move Task
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" v-for="list in lists" :list="list" href="#" @click="moveTask(list)">{{list.title}}</a>
      </div>
    </div>


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
  import Comment from "@/components/Comment.vue"
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
        taskEdit: false,
        commentOption: false,
        newTaskLocation: {
          listId: ""
        }
      }
    },
    mounted() {
      this.$store.dispatch('getAllComments', this.task._id)
    },
    computed: {
      tasks() {
        return this.$store.state.tasks
      },
      tasksById() {
        return this.$store.state.tasks.filter(t => t.listId == this.list._id)
      },
      comments() {
        return this.$store.state.comments
      },
      commentsById() {
        return this.$store.state.comments.filter(c => c.taskId == this.task._id)
      },
      lists() {
        return this.$store.state.lists
      }
      //make a computed for our comments
    },
    props: ["task", "list"],
    methods: {
      deleteTask(taskId) {
        this.$store.dispatch('deleteTask', taskId)
      },
      editTask(taskId) {
        let eT = this.editedTask
        if (eT.title == "") {
          eT = {
            listId: this.editedTask.listId,
            taskId: this.editedTask.taskId,
            description: this.editedTask.description
          }
        } else if (eT.description == "") {
          eT = {
            listId: this.editedTask.listId,
            taskId: this.editedTask.taskId,
            title: this.editedTask.title
          }
        }
        this.editedTask.listId = this.task.listId
        this.$store.dispatch('editTask', eT)
        this.taskChange = false
      },
      addComment() {
        this.newComment.boardId = this.bId
        this.newComment.taskId = this.task._id
        this.$store.dispatch('addComment', this.newComment)
        this.commentOption = false
        // this.newComment = { description: "" }
      },
      moveTask(listToMoveTo) {
        this.task.listId = listToMoveTo._id
        this.$store.dispatch('moveTask', this.task)
      }
    },
    components: {
      Comment
    }
  }

</script>

<style>
  .hover {
    cursor: pointer;
  }
</style>