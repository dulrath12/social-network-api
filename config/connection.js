const mongoose = require('mongoose')

const connectionString = process.env.MONGODB_URI

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})



module.exports = mongoose.connection