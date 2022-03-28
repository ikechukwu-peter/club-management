import bcyrpt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.model'



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


export {
    userRegistration,
};

