import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {
    userRegistration,
} from '../services/user.service'
import User from '../models/user.model'

const signToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_EXPIRESIN
    })
}

const register = async (req: Request, res: Response) => {
    console.log(req.body)
    const { email, password, username, firstname, lastname } = req.body;
    try {

        let newUser = await userRegistration(email, password, firstname, lastname, username)

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


const login = async (req: Request, res: Response) => {
    console.log(req.body)
    const { email, password } = req.body;
    try {

        let user = await User.findOne({
            where: { email },
        })
        console.log(user?.getDataValue('email'))

        if (!user || !(await bcrypt.compare(password, user?.getDataValue('password')))) {
            res.status(400).json({
                status: 'fail',
                error: 'Incorrect email or password'
            })
        }
        else {

            const token = signToken(user?.getDataValue('id'))
            user?.setDataValue('password', 'undefined');

            res.status(200).json({
                status: "success",
                user: {
                    token,
                    user
                }
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


const getUser = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        let user = await User.findByPk(id)
        if (user) {
            res.status(200).json({
                status: 'success',
                user
            })
        }
        else {
            res.status(404).json({
                status: 'fail',
                error: 'Error processing your request'
            })
        }
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            error: 'something went wrong'
        })
    }
}

export {
    register,
    login,
    getUser
}


