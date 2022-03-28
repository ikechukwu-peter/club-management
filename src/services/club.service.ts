import Club from '../models/club.model'
import ClubMember from '../models/clubmember.models'

const createClub = async (name: string, description: string, user_id: string) => {
    console.log(name, description)

    try {
        //check if a club already exist
        let club = await Club.create({
            userid: user_id,
            name,
            description
        })
        console.log(club)
        return Promise.resolve(club)

    } catch (error) {
        console.log(error)
        return Promise.reject(error)

    }
}

const createInvitation = async (username: string, firstname: string, lastname: string, clubId: string, userId: string) => {

    try {
        let invite_to_club = await ClubMember.create({
            username: username,
            fullname: `${firstname} ${lastname}`,
            clubid: clubId,
            userid: userId
        })
        console.log(invite_to_club)
        return Promise.resolve(invite_to_club)

    } catch (error) {
        console.log(error)
        return Promise.reject(error)

    }
}

const removeMember = async (clubmember_id: string) => {

    try {
        let removedUser = await ClubMember.destroy({
            where: { id: clubmember_id }
        })
        console.log(removedUser)
        return Promise.resolve(removedUser)

    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}

export {
    createInvitation,
    createClub,
    removeMember
};

