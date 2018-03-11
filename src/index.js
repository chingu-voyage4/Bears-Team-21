import express from 'express'
import expressValidator from 'express-validator'
import router from './routes'
import api from './api/index'
import bodyParser from 'body-parser'
import config from './config'
import db from './config/db'
import PrettyError from 'pretty-error'
import promisify from 'es6-promisify'
import passport from 'passport'
import cookieSession from 'cookie-session'

const app = express()
const server = require('http').createServer(app)

// allow for JSON formatted requests
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// express validation
app.use(expressValidator())

// cookie setup
app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
  keys: [config.cookieKey] // encryption key
}))

// passport.js setup
app.use(passport.initialize())
app.use(passport.session())

// connect to db if not in testing db
if (process.env.NODE_ENV !== 'test') {
  db.connect()
}

// setup imported routes
app.use(router)
app.use(api)

// promisify some callback based APIs
app.use((req, res, next) => {
  req.login = promisify(req.login, req)
  next()
})

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
