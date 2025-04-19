// import { Request, Response, NextFunction } from "express";
// import jwt from 'jsonwebtoken';
// import { User } from "../entity/userEntity";
// import { AppDataSource } from "../data-source";

// interface JwtPayload{
//     id: string;
//     username: string;
// }

// export const protect = async (req: Request, res: Response, next: NextFunction) =>{
//     const authHeader = req.headers.authorization;

//     if(!authHeader || !authHeader.startsWith('Bearer ')){
//         return res.status(401).json({ message: 'Not authorized, no token' });
//     }

//     const token = authHeader.split(' ')[1];
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    
//         const userRepo = AppDataSource.getRepository(User);
//         const user = await userRepo.findOne({ where: { id: decoded.id } });
    
//         if (!user) {
//           return res.status(401).json({ message: 'User not found' });
//         }
    
//         req.user = user; 
//         next();
//       } catch (err) {
//         console.error('Token verification failed:', err);
//         return res.status(401).json({ message: 'Token not valid' });
//       }
//     };

import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from 'jsonwebtoken';
import { User } from "../entity/userEntity";
import { AppDataSource } from "../data-source";

interface JwtPayload {
    id: string;
    username: string;
}

export const protect: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Not authorized, no token' });
        return; // Exit without returning the response object
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        const userRepo = AppDataSource.getRepository(User);
        const user = await userRepo.findOne({ where: { id: decoded.id } });

        if (!user) {
            res.status(401).json({ message: 'User not found' });
            return; // Exit without returning the response object
        }

        req.user = user;
        next(); // Continue to the next middleware/route
    } catch (err) {
        console.error('Token verification failed:', err);
        res.status(401).json({ message: 'Token not valid' });
    }
};