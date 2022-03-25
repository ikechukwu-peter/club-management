import bcyrpt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.model'
import Club from '../models/club.model'
import Invitation from '../models/invitation.model'


const signToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_EXPIRESIN
    })
}


const userRegistration = async (email: string, password: string, firstname: string, username: string) => {

    let hashedPassword: string = await bcyrpt.hash(password, 12);

    try {
        let user = await User.create({
            email,
            password: hashedPassword,
            firstname,
            username
        })
        console.log(user)
        return Promise.resolve(user)

    } catch (error) {
        console.log(error)
        return Promise.reject(error)

    }


}


const userLogin = async (email: string, password: string) => {

    try {
        let user = await User.findOne({
            where: { email },
        })
        console.log(user?.getDataValue('email'))

        if (user === null || !(await bcyrpt.compare(password, user?.getDataValue('password')))) {
            return Promise.reject('Incorrect email or password')
        }
        else {
            const token = signToken(user?.getDataValue('id'))
            user?.setDataValue('password', 'undefined');
            return Promise.resolve({ token, user })
        }

    } catch (error) {
        console.log(error)
        return Promise.reject(error)

    }

}


const createClub = async (club_name: string, user_id: string) => {

    try {
        let club = await Club.create({
            club_name,
            club_admin: user_id
        })
        console.log(club)
        return Promise.resolve(club)

    } catch (error) {
        console.log(error)
        return Promise.reject(error)

    }
}

const createInvitation = async (id: string, user_id: string) => {

    try {
        let invite_to_club = await Invitation.create({
            user_id,
            club_admin: id
        })
        console.log(invite_to_club)
        return Promise.resolve(invite_to_club)

    } catch (error) {
        console.log(error)
        return Promise.reject(error)

    }
}

const acceptInvitation = async (invitation_id: string) => {

    try {
        let accept_invite = await Invitation.update(
            { status: 'accepted' },
            { where: { id: invitation_id } }
        )
        console.log(accept_invite)
        return Promise.resolve(accept_invite)

    } catch (error) {
        console.log(error)
        return Promise.reject(error)

    }
}

const rejectInvitation = async (invitation_id: string) => {

    try {
        let reject_invite = await Invitation.update(
            { status: 'rejected' },
            { where: { id: invitation_id } }
        )
        console.log(reject_invite)
        return Promise.resolve(reject_invite)

    } catch (error) {
        console.log(error)
        return Promise.reject(error)

    }
}


const removeUser = async (user_id: string) => {

    try {
        let reject_invite = await Club.destroy({
            where: { user_id }
        }
        )
        console.log(reject_invite)
        return Promise.resolve(reject_invite)

    } catch (error) {
        console.log(error)
        return Promise.reject(error)

    }
}

export {
    userRegistration,
    userLogin,
    rejectInvitation,
    acceptInvitation,
    createInvitation,
    createClub,
    removeUser
};

