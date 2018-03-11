import mongoose from 'mongoose'
import promisify from 'es6-promisify'
import '../models/user'

const User = mongoose.model('User')

/* User Registration Middleware */
exports.register = async (req, res, next) => {
  const { email, username, password } = req.body
  const user = new User({ email, username })
  const registerWithPromise = promisify(User.register, User)

  await registerWithPromise(user, password)

  next() // pass to authController.login
}

/* User Validation and Sanitization Middleware */
exports.validateRegister = (req, res, next) => {
  req.sanitizeBody('username')
  req.checkBody('username', 'You must supply a username').notEmpty()
  req.checkBody('email', 'You must supply a email').notEmpty()
  req.checkBody('email', 'That email is not valid!').isEmail()
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  })
  req.checkBody('password', 'Password cannot be empty!').notEmpty()
  req.checkBody('confirm-password', 'Password cannot be empty!').notEmpty()
  req.checkBody('confirm-password', 'Oops! Your passwords do not match').equals(req.body.password)

  /* If there are any validation errors throw them */
  const errors = req.validationErrors()
  if (errors) {
    res.status(400).send({ errors })
  }
  // If there are no errors pass on
  next()
}
