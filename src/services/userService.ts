import { AppDataSource } from "../data-source";
import { HashUtils } from "../utils/hash";
import { User } from "../entity/userEntity";
import { AppError } from "../utils/errorHandler";

export class UserService  {
    static async createUser(email: string, username: string, password: string): Promise<User>{
        const repo = AppDataSource.getRepository(User)
        const isExisting = await repo.findOne({where: [{email}, {username}]})
        if(isExisting) throw new AppError('User with that email or username already exists', 409);

        const hashedPassword = await HashUtils.hashPassword(password)
        const user =   repo.create({email,username, password: hashedPassword })
        return repo.save(user)
    }

    static async findByEmail(email: string): Promise<User | null>{
        const repo = AppDataSource.getRepository(User)
        return await repo.findOne({where: {email}})
    }
}