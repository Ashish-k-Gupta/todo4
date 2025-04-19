import { UserService } from "./userService";
import jwt from 'jsonwebtoken'
import { HashUtils } from "../utils/hash";
import { AppError } from "../utils/errorHandler";

export class AuthService {
    static async login(email: string, password: string): Promise<string>{
        const user = await UserService.findByEmail(email);
        if(!user) throw new AppError('Invalid Credentails', 409)

        const isMatch = await HashUtils.comparePassword(password, user.password)
        if(!isMatch) throw new AppError('Invalid Credentails', 409)
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET!, {
            expiresIn: '1h'
        })
        return token;

    }
}