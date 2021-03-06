let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'Task'


let schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  created: { type: Number, required: true, default: Date.now() },
  authorId: { type: ObjectId, ref: 'User', required: true },
  listId: { type: ObjectId, ref: "List", required: true },
  boardId: { type: ObjectId, ref: 'Board', required: true }
})


module.exports = mongoose.model(schemaName, schema)