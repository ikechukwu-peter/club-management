import { Request, Response } from 'express'
import {
    userRegistration,
    userLogin,
    createClub,
    rejectInvitation,
    acceptInvitation,
    removeUser, createInvitation
} from '../services/user.service'
import User from '../models/user.model'
import Club from '../models/club.model'

const register = async (req: Request, res: Response) => {
    console.log(req.body)
    const { email, password, username, firstname } = req.body;
    try {
        let existingUser = await User.findOne({ where: { email: email } });
        if (existingUser) {
            res.status(400).json({
                status: "fail",
                error: 'User already exist'
            })
        }
        else {
            let newUser = await userRegistration(email, password, firstname, username)

            res.status(200).json({
                status: "success",
                newUser
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 'fail',
            error: 'Something went wrong'
        })
    }

}


const login = async (req: Request, res: Response) => {
    console.log(req.body)
    const { email, password } = req.body;
    try {

        let newUser = await userLogin(email, password)
        console.log(newUser)

        res.status(200).json({
            status: "success",
            newUser
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 'fail',
            error: 'Something went wrong'
        })
    }
}



const create_club = async (req: Request, res: Response) => {
    console.log(req.body)
    const { club_name, user_id } = req.body;
    try {

        let newClub = await createClub(club_name, user_id)
        console.log(newClub)

        res.status(200).json({
            status: "success",
            newClub
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 'fail',
            error: 'Something went wrong'
        })
    }
}

const create_invitation = async (req: Request, res: Response) => {
    console.log(req.body)
    const { user_id } = req.params;

    try {
        let newInvite = await createInvitation(req.user?.id as string, user_id)
        console.log(newInvite)

        res.status(200).json({
            status: "success",
            newInvite
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 'fail',
            error: 'Something went wrong'
        })
    }
}


const accept_invitation = async (req: Request, res: Response) => {
    console.log(req.body)
    const { invitation_id } = req.params;

    try {
        let acceptInvite = await acceptInvitation(invitation_id)
        console.log(acceptInvite)

        res.status(200).json({
            status: "success",
            acceptInvite
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 'fail',
            error: 'Something went wrong'
        })
    }
}

const reject_invitation = async (req: Request, res: Response) => {
    console.log(req.body)
    const { invitation_id } = req.params;

    try {
        let rejectInvite = await rejectInvitation(invitation_id)
        console.log(rejectInvite)

        res.status(200).json({
            status: "success",
            rejectInvite
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 'fail',
            error: 'Something went wrong'
        })
    }
}



const remove_user = async (req: Request, res: Response) => {
    console.log(req.body)
    const { user_id } = req.params;

    try {
        let admin = await Club.findOne({ where: { club_admin: req.user?.id } });
        if (admin) {
            await removeUser(user_id)
            res.status(200).json({
                status: "success"
            })
        }
        else {
            res.status(403).json({
                status: "fail",
                error: "Forbidden"
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 'fail',
            error: 'Something went wrong'
        })
    }
}

export {
    register,
    login,
    create_club,
    create_invitation,
    accept_invitation,
    reject_invitation,
    remove_user
}