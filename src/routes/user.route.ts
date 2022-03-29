import express from 'express';
import passport from 'passport';
import {
    register,
    login,
    getUser
} from '../controllers/user.controller'


const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/user/:id', passport.authenticate('jwt', { session: false }), getUser)

export default router;
