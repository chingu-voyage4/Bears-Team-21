import nodemailer from 'nodemailer'
import pug from 'pug'
import juice from 'juice'
import htmlToText from 'html-to-text'
import promisify from 'es6-promisify'
import config from '../config'

const transport = nodemailer.createTransport({
  host: config.mail_host,
  port: config.mail_port,
  auth: {
    user: config.mail_user,
    pass: config.mail_pass
  }
})

const generateHTML = (filename, options = {}) => {
  const html = pug.renderFile(`${__dirname}/../views/email/${filename}.pug`, options)
  const inlined = juice(html)

  return inlined
}

exports.send = async (options) => {
  const html = generateHTML(options.filename, options)
  const text = htmlToText.fromString(html)

  const mailOptions = {
    from: 'No-Reply <no-reply@localhost.com>',
    to: options.user.email,
    subject: options.subject,
    html,
    text
  }

  const sendMail = promisify(transport.sendMail, transport)
  return sendMail(mailOptions)
}
