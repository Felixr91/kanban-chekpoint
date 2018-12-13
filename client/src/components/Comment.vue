<template>
  <div class="">
    <div>
      <span>

        {{comment.description}}
        <i class="fas fa-times-circle ml-2 hover font" @click="deleteComment(comment._id)"></i>
      </span>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'Comment',
    data() {
      return {
        bId: this.$route.params.boardId,
        newComment: {
          description: "",
          taskId: this.$route.params.taskId,
          boardId: this.$route.params.boardId
        }
      }
    },
    computed: {
      // comments() {
      //   return this.$store.state.comments
      // },
      commentsById() {
        return this.$store.state.comments.filter(c => c.taskId == this.task._id)
      }
    },
    methods: {
      deleteComment(commentId) {
        this.$store.dispatch('deleteComment', commentId)
      }
    },
    props: ["comment"]
  }

</script>

<style>


</style>