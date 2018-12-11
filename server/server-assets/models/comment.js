let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'Comment'


let schema = new Schema({
  description: { type: String, required: true },
  created: { type: Number, required: true, default: Date.now() },
  authorId: { type: ObjectId, ref: 'User', required: true },
  taskId: { type: ObjectId, ref: 'Task', required: true },
  boardId: { type: ObjectId, ref: 'Board', required: true }
})


module.exports = mongoose.model(schemaName, schema)