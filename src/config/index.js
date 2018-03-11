import dotenv from 'dotenv'

dotenv.config()

const config = {
  'port': process.env.PORT || 3333,
  'db': process.env.DB,
  'portIO': process.env.PORTIO || 4444,
  'cookieKey': process.env.COOKIEKEY,
  'mail_host': process.env.MAIL_HOST,
  'mail_port': process.env.MAIL_PORT,
  'mail_user': process.env.MAIL_USER,
  'mail_pass': process.env.MAIL_PASS
}

export default config
