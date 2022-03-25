import { Strategy, ExtractJwt } from 'passport-jwt'
import User from '../models/user.model'

interface options {
    jwtFromRequest: string,
    secretOrKey: string
}

let options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}

export default (passport: any) => {
    passport.use(
        new Strategy(options, async (jwt_payload: any, done: any) => {
            try {
                const user = await User.findByPk(jwt_payload.id);
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            } catch (err) {
                console.log(err);
            }
        })
    );
};