let router = require('express').Router()
let Lists = require('../models/list')

//GET Lists  A OKAY?
router.get('/', (req, res, next) => {
  Lists.find({ authorId: req.session.uid })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//POST Lists  A OKAY!!!!!!!
router.post('/:boardId', (req, res, next) => {
  req.body.authorId = req.session.uid
  req.body.boardId = req.params.boardId
  Lists.create(req.body)
    .then(newList => {
      res.send(newList)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//PUT Lists
router.put('/:id', (req, res, next) => {
  Lists.findById(req.params.id)
    .then(list => {
      if (!list.authorId.equals(req.session.uid)) {
        return res.status(401).send("ACCESS DENIED! Only Author can edit a list.")
      }
      list.update(req.body, (err) => {
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

//DELETE Lists
router.delete('/:id', (req, res, next) => {
  Lists.findById(req.params.id)
    .then(list => {
      if (!list.authorId.equals(req.session.uid)) {
        return res.status(401).send("ACCESS DENIED! Only author can delete!")
      }
      list.remove(err => {
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