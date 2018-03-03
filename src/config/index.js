import dotenv from 'dotenv'

dotenv.config()

const config = {
  'port': process.env.PORT || 3333,
  'db': process.env.DB,
  'portIO': process.env.PORTIO || 4444
}

export default config
