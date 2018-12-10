let router = require('express').Router()
let Tasks = require('../models/task')

//GET Tasks  A OKAY?
router.get('/', (req, res, next) => {
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
router.post('/:boardId', (req, res, next) => {
  req.body.authorId = req.session.uid
  req.body.boardId = req.params.boardId
  Tasks.create(req.body)
    .then(newList => {
      res.send(newList)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//PUT Tasks
router.put('/:id', (req, res, next) => {
  Tasks.findById(req.params.id)
    .then(task => {
      if (!task.authorId.equals(req.session.uid)) {
        return res.status(401).send("ACCESS DENIED! Only Author can edit a list.")
      }
      task.update(req.body, (err) => {
        if (err) {
          console.log(err)
          next()
          return
        }
        res.send("Successfully Updated List!")
      });
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//DELETE Tasks
router.delete('/:id', (req, res, next) => {
  Tasks.findById(req.params.id)
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