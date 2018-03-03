import mongoose from 'mongoose'
import config from './index'

const dbURI = config.db

let db = {}

mongoose.Promise = global.Promise

db.connect = (done) => {
  const mongooseConnection = mongoose.connection
  console.log(dbURI)
  mongoose.connect(dbURI)
  mongooseConnection.on('connected', () => {
    console.log('Database connected to ' + dbURI)
    if (done) {
      done()
    }
  })
  mongooseConnection.on('error', (err) => {
    console.log('Mongoose default connection error: ' + err)
    process.exit(1)
  })
  mongooseConnection.on('disconnected', () => {
    console.log('Mongoose default connection disconnected')
  })
  process.on('SIGINT', () => {
    mongooseConnection.close(() => {
      console.log('Mongoose default connection disconnected through app termination')
      process.exit(0)
    })
  })
  process.on('exit', () => {
    mongooseConnection.close(() => {
      console.log('Mongoose default connection disconnected through programmatic exit')
    })
  })
}

export default db
