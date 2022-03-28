import bcyrpt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.model'

const signToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_EXPIRESIN
    })
}


const userRegistration = async (email: string,
    password: string,
    firstname: string,
    lastname: string,
    username: string
) => {

    let hashedPassword: string = await bcyrpt.hash(password, 12);

    try {
        let user = await User.create({
            email: email.toLocaleLowerCase(),
            password: hashedPassword,
            firstname,
            lastname,
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

export {
    userRegistration,
    userLogin,
   
};

