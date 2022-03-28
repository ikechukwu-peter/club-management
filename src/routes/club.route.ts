import express from 'express';
import passport from 'passport';
import {
    create_club,
    create_invitation,
    accept_invitation,
    reject_invitation,
    remove_member,
    clubMembers,
    allMembers,
    deleteClub,
    allClubs
} from '../controllers/club.controllers'


const router = express.Router()
router.get('/all/users', passport.authenticate('jwt', { session: false }), allMembers)
router.get('/clubs', passport.authenticate('jwt', { session: false }), allClubs)
router.get('/members/:id', passport.authenticate('jwt', { session: false }), clubMembers)
router.delete('/delete/club/:clubId', passport.authenticate('jwt', { session: false }), deleteClub)
router.post('/create/club', passport.authenticate('jwt', { session: false }), create_club)
router.post('/invite/:username/:clubId', passport.authenticate('jwt', { session: false }), create_invitation)

router.post('/join/:clubmember_id', passport.authenticate('jwt', { session: false }), accept_invitation)
router.post('/reject/:clubmember_id', passport.authenticate('jwt', { session: false }), reject_invitation)

router.post('/remove/user/:clubmember_id', passport.authenticate('jwt', { session: false }), remove_member)


export default router;
