import express from 'express'
import router from './routes'

const app = express()

app.use(router)
const port = process.env.PORT || 3333
app.listen(port, () => {
  console.log('app listening on port ' + port)
})

app.use(express.static('client/build'))