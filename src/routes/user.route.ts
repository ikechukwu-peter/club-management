import express from 'express';
import passport from 'passport';
import {
    register,
    login,
    create_club,
    create_invitation,
    accept_invitation,
    reject_invitation,
    remove_user
} from '../controllers/user.controller'


const router = express.Router()

router.post('/register', register)
router.post('/login', login)

router.post('/create/club', passport.authenticate('jwt', { session: false }), create_club)
router.post('/invite/:user_id', passport.authenticate('jwt', { session: false }), create_invitation)

router.post('/join/:invitation_id', passport.authenticate('jwt', { session: false }), accept_invitation)
router.post('/reject/:invitation_id', passport.authenticate('jwt', { session: false }), reject_invitation)

router.post('/remove/user/:user_id', passport.authenticate('jwt', { session: false }), remove_user)


export default router;
