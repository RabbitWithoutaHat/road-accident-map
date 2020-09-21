const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()
console.log(__dirname)

app.use(express.static(`${__dirname}/public`))
app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/data', require('./routes/data.routes'))

const PORT = config.get('port') || 5000

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    app.listen(PORT, () => console.log(`App STARTED at ${PORT}!`))
  } catch (error) {
    console.log(`Error: ${error.message}`)
    process.exit()
  }
}
start()
