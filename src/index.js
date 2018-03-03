import express from 'express'
import router from './routes'

const app = express()

app.use(router)

app.listen(3333, () => {
  console.log('app listening on port 3333')
})

app.use(express.static('client/build'))