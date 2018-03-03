import express from 'express'
import router from './routes'
import bodyParser from 'body-parser'
import config from './config'
import db from './config/db'
import PrettyError from 'pretty-error'

const app = express()
const server = require('http').createServer(app)
// allow for JSON formatted requests
app.use(bodyParser.json())
// connect to db if not in testing db
if (process.env.NODE_ENV !== 'test') {
  db.connect()
}
// setup imported routes
app.use(router)
// io
const io = require('socket.io')(server)
io.on('connection', (client) => {
  console.log(`New client connected ${client.id}`)
  let interval
  client.on('bazingatest', (bazingatestdata) => {
    console.log('client is testing the bazingatest event ', bazingatestdata)
    interval = setInterval(() => {
      client.emit('bazingatesttime', new Date())
    }, 250)
  })
  client.on('stopTimer', () => {
    console.log('interval cleared')
    clearInterval(interval)
  })
})

// start listening on requests
if (process.env.NODE_ENV !== 'test') {
  app.listen(config.port, () => {
    console.log('app listening on port ' + config.port)
  })
  app.use(express.static('client/build'))
  io.listen(config.portIO)
}
// error setup
const pe = new PrettyError()
// Catch unhandler errors
app.use((err, req, res, next) => {
  var renderedError = pe.render(err)
  console.log(renderedError)
  pe.skipNodeFiles() // this will skip events.js and http.js and similar core node files
  pe.skipPackage('express') // this will skip all the trace lines about express` core and sub-modules
  res
    .status(500)
    .json({
      body: err.message
    })
})
// Uncaught exceptions
process.on('uncaughtException', err => {
  const renderedError = pe.render(err)
  console.log(renderedError)
})
// unhandled promises
process.on('unhandlerdRejection', err => {
  const renderedError = pe.render(err)
  console.log(renderedError)
})
// export for uses elsewhere
export default app
