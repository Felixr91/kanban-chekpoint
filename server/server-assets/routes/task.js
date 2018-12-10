let router = require('express').Router()
let Tasks = require('../models/task')

//GET Tasks  A OKAY?
router.get('/:listId', (req, res, next) => {
  Tasks.find({ authorId: req.session.uid })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//POST Tasks  A OKAY!!!!!!!
router.post('/', (req, res, next) => {
  req.body.authorId = req.session.uid
  // req.body.listId = req.params.listId
  Tasks.create(req.body)
    .then(newTask => {
      res.send(newTask)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//PUT Tasks
router.put('/:taskId', (req, res, next) => {
  Tasks.findById(req.params.taskId)
    .then(task => {
      if (!task.authorId.equals(req.session.uid)) {
        return res.status(401).send("ACCESS DENIED! Only Author can edit a task.")
      }
      task.update(req.body, (err) => {
        if (err) {
          console.log(err)
          next()
          return
        }
        res.send("Successfully Updated Task!")
      });
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//DELETE Tasks
router.delete('/:taskId', (req, res, next) => {
  Tasks.findById(req.params.taskId)
    .then(task => {
      if (!task.authorId.equals(req.session.uid)) {
        return res.status(401).send("ACCESS DENIED! Only author can delete!")
      }
      task.remove(err => {
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