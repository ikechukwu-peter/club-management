import { Request, Response } from 'express'
import { Op } from 'sequelize'
import {
    createClub,
    createInvitation,
    removeMember
} from '../services/club.service'
import User from '../models/user.model'
import Club from '../models/club.model'
import ClubMember from '../models/clubmember.models'

const create_club = async (req: Request, res: Response) => {
    console.log(req.user)
    const { name, description } = req.body;

    try {
        let clubExist = await Club.findOne({
            where: {
                userId: req.user,
                name
            }
        })

        if (clubExist) {
            res.status(400).json({
                status: 'fail',
                error: `you already have a club by the name ${clubExist.getDataValue('name')}`
            })
        }
        else {
            let newClub = await createClub(name, description, req.user as string)
            console.log(newClub)

            res.status(200).json({
                status: "success",
                newClub
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

const create_invitation = async (req: Request, res: Response) => {
    console.log(req.body)
    const { username, clubId } = req.params;
    console.log(req.user)

    try {
        let club = await Club.findOne({
            where: {
                id: clubId
            }
        })

        if (club) {
            let user = await User.findOne({
                where: { username: username }
            })
            if (user) {
                let club_member = await ClubMember.findOne({
                    where: {
                        username: username
                    }
                })
                if (club_member) {
                    res.status(400).json({
                        status: 'fail',
                        error: `${username} is already a member of your club`
                    })
                }
                else {
                    let data = await createInvitation(username, user.getDataValue("firstname"), user.getDataValue("lastname"), club.getDataValue("id"))
                    console.log(data) 
                    res.status(201).json({
                        status: "succcess",
                        message: `${username} successfully invited`,
                        data
                    })
                }
            }
            else {
                res.status(404).json({
                    status: "fail",
                    error: "no user found"
                })
            }
        }
        else {
            res.status(404).json({
                status: 'fail',
                error: 'invalid club'
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


const accept_invitation = async (req: Request, res: Response) => {
    console.log(req.body)
    const { clubmember_id } = req.params;

    try {
        let clubmember = await ClubMember.findOne({
            where: {
                id: clubmember_id
            }
        })

        if (clubmember) {
            let club = await Club.findOne({
                where: {
                    id: clubmember.getDataValue("clubId")
                }
            })

            if (club) {
                await ClubMember.update({ status: 'active' }, {
                    where: {
                        id: clubmember.getDataValue("id")
                    }
                })
                res.status(200).json({
                    status: 'success',
                    message: `you are now a member of ${club.getDataValue("name")}`
                })
            }
            else {
                res.status(404).json({
                    status: 'fail',
                    error: 'invalid club'
                })
            }
        }
        else {
            res.status(404).json({
                status: "fail",
                error: 'no club member found'
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

const reject_invitation = async (req: Request, res: Response) => {
    console.log(req.body)
    const { clubmember_id } = req.params;

    try {
        let clubmember = await ClubMember.findOne({
            where: {
                id: clubmember_id
            }
        })

        if (clubmember) {
            let club = await Club.findOne({
                where: {
                    id: clubmember.getDataValue("id")
                }
            })

            if (club) {
                await ClubMember.update({ status: 'rejected' }, {
                    where: {
                        id: clubmember.getDataValue("id")
                    }
                })
                res.status(200).json({
                    status: 'success',
                    message: `you are have rejected joining ${club.getDataValue("name")}`
                })
            }
            else {
                res.status(404).json({
                    status: 'fail',
                    error: 'invalid club'
                })
            }
        }
        else {
            res.status(404).json({
                status: "fail",
                error: 'no member found'
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



const remove_member = async (req: Request, res: Response) => {
    console.log(req.body)
    const { clubmember_id } = req.params;

    try {
        let club_member = await ClubMember.findOne(
            { where: { id: clubmember_id } }
        );

        if (club_member) {
            let club = await Club.findOne({
                where: {
                    id: club_member.getDataValue("id")
                }
            })
            if (club) {
                await removeMember(clubmember_id)
                res.status(200).json({
                    status: "success"
                })
            }
            else {
                res.status(400).json({
                    status: "fail",
                    error: "There was an error processing your request "
                })
            }
        }
        else {
            res.status(403).json({
                status: "fail",
                error: "There was an error processing your request "
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

const clubMembers = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const members = await ClubMember.findAll({
            where: {
                clubId: id,
                status: 'active'
            }
        });

        return res.status(200).json({
            status: 200,
            message: "Member's list",
            data: members
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        })
    }
}


const allMembers = async (req: Request, res: Response) => {
    try {
        const user = await User.findAll({
            attributes: {
                exclude: ['password'],
            },
            order: [['id', 'DESC']]
        });

        return res.status(200).json({
            status: 200,
            message: "Member's list",
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        })
    }
}

//delete club
const deleteClub = async (req: Request, res: Response) => {
    const { club_id } = req.params;
    const id = req.user;
    try {
        //check if record exist in db
        const club = await Club.findOne({
            where: {
                id: club_id,
                userId: id
            }
        });

        console.log(club);
        if (club) {
            //if club exist, delete it
            await Club.destroy({
                where: {
                    id: club.getDataValue("id")
                }
            });
            //return success message
            return res.status(200).json({
                status: 200,
                message: `${club.getDataValue("name")} was successfully deleted`
            });
        }
        else {

            return res.status(400).json({
                status: 400,
                message: "Cannot delete invalid club"
            });
        }

    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        });
    }
}

const allClubs = async (req: Request, res: Response) => {
    const id = req.user;
    console.log(id)
    try {
        const club = await Club.findAll({
            where: {
                userId: id
            }
        });
        return res.status(200).json(club);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        });
    }
}

const userClubs = async (req: Request, res: Response) => {
    const id = req.user;
    try {
        const club = await ClubMember.findAll({
            where: {
                id: id,
                status: 'pending'
            }
        });
        return res.status(200).json(club);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        });
    }
}

export {
    create_club,
    create_invitation,
    accept_invitation,
    reject_invitation,
    remove_member,
    clubMembers,
    allMembers,
    deleteClub,
    allClubs,
    userClubs
}
