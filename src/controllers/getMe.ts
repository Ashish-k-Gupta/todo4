import { Request, Response } from "express";

// export const getMe = async(req: Request, res: Response) =>{
//     console.log('req.user:', req.user); 
//     if(!req.user){
//         return res.status(401).json({message: "Not authroized"})
//     }

//     res.json({
//         id: req.user.id,
//         email: req.user.email,
//         username: req.user.username
//     })
// }

export const getMe = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ message: 'Not authorized' });
        return;
      }
  
      res.status(200).json({
        id: req.user.id,
        email: req.user.email,
        username: req.user.username,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Something went wrong' });
    }
  };
  