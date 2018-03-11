import passport from 'passport'
import mongoose from 'mongoose'

const User = mongoose.model('User')

passport.use(User.createStrategy())

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
