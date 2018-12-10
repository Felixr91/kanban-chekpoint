var mongoose = require('mongoose')
var connectionString = 'mongodb://holla1:holla1@ds016298.mlab.com:16298/holla'
var connection = mongoose.connection


mongoose.connect(connectionString, { useMongoClient: true })

connection.on('error', err => {
  console.log('ERROR FROM DATABASE: ', err)
})


connection.once('open', () => {
  console.log('Connected to Database')
})