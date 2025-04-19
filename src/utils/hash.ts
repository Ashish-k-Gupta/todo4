import bcrypt from 'bcrypt';

export class HashUtils {
    static async hashPassword(input: string):Promise<string>{
        const salt = await bcrypt.genSalt(10);
          return await bcrypt.hash(input, salt)
    }

    static async comparePassword(input: string, hashed: string): Promise<boolean>{
        return await bcrypt.compare(input, hashed)
    }
}