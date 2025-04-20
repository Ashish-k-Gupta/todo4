import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { AuthService } from "../services/authService";


export const register = async (req: Request, res: Response) => {
    try{
        const { email, username, password } = req.body
        const user = await UserService.createUser(email, username, password);
        res.status(201).json({ id: user.id, email: user.email })
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Internal Server Error"})
    }
}

export const login = async (req: Request, res: Response) => {
    try{
        const { email, password } = req.body
        const token = await AuthService.login(email, password);
        res.status(201).json({ token })
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Internal Server Error"})
    }
}

export const getMe = async (req: Request, res: Response) => {
  try{
    if (!req.user) {
        res.status(401).json({ message: 'Not authorized' });
        return
    }
    res.json({
        id: req.user.id,
        email: req.user.email,
        username: req.user.username,
    });
}
    catch(error){
        console.log(error);
        res.status(500).json({message: "Internal Server Error"})
    }
}