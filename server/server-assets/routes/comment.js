let router = require('express').Router()
let Comments = require('../models/comment')

//GET Comments  A OKAY?
router.get('/:taskId', (req, res, next) => {
  Comments.find({ authorId: req.session.uid })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//POST Comments  A OKAY!!!!!!!
router.post('/', (req, res, next) => {
  req.body.authorId = req.session.uid
  // req.body.taskId = req.params.taskId
  Comments.create(req.body)
    .then(newComment => {
      res.send(newComment)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//PUT Comments
router.put('/:commentId', (req, res, next) => {
  Comments.findById(req.params.commentId)
    .then(comment => {
      if (!comment.authorId.equals(req.session.uid)) {
        return res.status(401).send("ACCESS DENIED! Only Author can edit a Comment.")
      }
      comment.update(req.body, (err) => {
        if (err) {
          console.log(err)
          next()
          return
        }
        res.send("Successfully Updated Comment!")
      });
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//DELETE Comments
router.delete('/:commentId', (req, res, next) => {
  Comments.findById(req.params.commentId)
    .then(comment => {
      if (!comment.authorId.equals(req.session.uid)) {
        return res.status(401).send("ACCESS DENIED! Only author can delete!")
      }
      comment.remove(err => {
        if (err) {
          console.log(err)
          next()
          return
        }
        res.send("Successfully Deleted")
      });
    })
})





module.exports = router