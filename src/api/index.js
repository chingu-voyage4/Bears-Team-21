import { Router } from 'express'
import { login, logout, confirmPasswords, forgot, updatePassword } from '../controllers/authController'
import { register, validateRegister } from '../controllers/userController'
import { catchErrors } from '../handlers/errorHandlers'

const api = Router()

// Auth Routes
api.post('/api/user/register', validateRegister, catchErrors(register))
api.post('/api/user/login', login)
api.post('/api/user/logout', logout)
api.post('/api/user/forgot', catchErrors(forgot))
api.post('/api/user/update', confirmPasswords, catchErrors(updatePassword))

export default api
