import mongoose from 'mongoose'
import passport from 'passport'
import crypto from 'crypto'
import promisify from 'es6-promisify'
import mail from '../handlers/mail'
import '../models/user'

const User = mongoose.model('User')

/* Passport User Login Authentication */
exports.login = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
})

/* Create passport middleware to check if the user is logged in */
exports.isLoggedIn = (req, res, next) => {
  // check if user is authenticated
  if (req.isAuthenticated()) {
    next()
    return
  }
  // If the user isn't logged in throw unauthorized access error
  res.status(401).send('You are not authorized to do that!')
}

/* Passport User Logout */
exports.logout = (req, res) => {
  req.logout()
  res.status(200).send('You are successfully logged out.')
}

/* Create password reset request funcionality */
exports.forgot = async (req, res) => {
  req.checkBody('email', 'You must supply a email').notEmpty()
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  })

  const { email } = req.body
  const user = await User.findOne({ email })

  if (!user) {
    res.status(404).send('An account with that email does not exist.')
    return
  }

  // Create random reset token and set to user
  user.resetPasswordToken = crypto.randomBytes(20).toString('hex')
  user.resetPasswordExpires = Date.now() + 3600000 // 1 hour from now

  await user.save()

  const resetURL = `https://${req.headers.host}/reset/${user.resetPasswordToken}`

  /* Send password reset email to user */
  await mail.send({
    user,
    subject: 'Password reset',
    resetURL,
    filename: 'password-reset'
  })

  res.status(200).send('You have been emailed a password reset link.')
}

/* Create passport middleware to check if both password match */
exports.confirmPasswords = (req, res, next) => {
  if (req.body.password === req.body['confirm-password']) {
    next()
    return
  }
  // If passwords don't match thow error
  res.status(400).send('Passwords do not match!')
}

/* Create passport functionality to update the password */
exports.updatePassword = async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.body.token,
    resetPasswordExpires: { $gt: Date.now() }
  })

  // If user isn't found throw error
  if (!user) {
    res.status(400).send('Password reset token is invalid or has expired')
    return
  }

  // Create a promisified version of the setPassword function
  const setPasswordPromisify = promisify(user.setPassword, user)
  await setPasswordPromisify(req.body.password)

  // Set both token and expires to undefined so that it gets cleared from the db
  user.resetPasswordToken = undefined
  user.resetPasswordExpires = undefined
  const updatedUser = await user.save()

  // Log in user after password has been updated
  await req.login(updatedUser)
  res.status(201).send('Your password has been successfully reset!')
}
