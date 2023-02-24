const connectToMongo= require('./Components/db')
connectToMongo();
const express = require('express')
const app = express()
const port = 5000

// Available Routes for the inotebook.
app.use(express.json())
app.use('/api/auth', require('./routes/auth.js'))
app.use('/api/notes', require('./routes/notes.js'))



app.listen(port, () => {
  console.log(`inoteBook Backend is listening on port ${port}`)
})