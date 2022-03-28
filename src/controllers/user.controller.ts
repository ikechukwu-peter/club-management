import { Request, Response } from 'express'
import {
    userRegistration,
    userLogin,
  } from '../services/user.service'
import User from '../models/user.model'


const register = async (req: Request, res: Response) => {
    console.log(req.body)
    const { email, password, username, firstname, lastname } = req.body;
    try {
        let existingUser = await User.findOne({ where: { email: email } });
        if (existingUser) {
            res.status(400).json({
                status: "fail",
                error: 'User already exist'
            })
        }
        else {
            let newUser = await userRegistration(email, password, firstname, lastname, username)

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


export {
    register,
    login,
   }