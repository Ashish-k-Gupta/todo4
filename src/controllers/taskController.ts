import { Request, Response, NextFunction } from "express";
import { TaskService } from "../services/taskService";
import { AppError } from "../utils/errorHandler";

export const createTask = async (req: any, res: Response, next: NextFunction) =>{
    try{
        const  {title, description, isDone} = req.body
        const userId = req.user.id;

        if (!userId) {
            throw new AppError("User not authenticated", 401);  
        }
        const task = await TaskService.createTask(title, description, isDone, userId)

        res.status(201).json({
            task: {
                id: task.id,
                title: task.title,
                description: task.description,
                createdAt: task.createdAt
            }
        })
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


// export const updateTask = async (req: any, res: Response, next: NextFunction) => {
//     try {
//         const { title, description, isDone } = req.body;
//         const userId = req.user.id;
//         const taskId = req.params.id;

//         if (!userId) {
//             throw new AppError("User not authenticated", 401);
//         }

//         const updatedTask = await TaskService.updateTask(taskId,userId, { 
//             title, 
//             description, 
//             isDone} );

//         res.status(200).json({
//             task: {
//                 id: updatedTask.id,
//                 title: updatedTask.title,
//                 description: updatedTask.description,
//                 isDone: updatedTask.isDone,
//                 updatedAt: updatedTask.updatedAt,
//             }
//         });
//     } catch (error) {
//         console.error(error);
//         if (error instanceof AppError) {
//             return res.status(error.statusCode).json({ message: error.message });
//         }
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };

export const updateTask = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { title, description, isDone } = req.body;
        const userId = req.user.id;
        const taskId = req.params.id;

        if (!userId) {
            throw new AppError("User not authenticated", 401);
        }

        const updatedTask = await TaskService.updateTask(taskId, userId, {
            title,
            description,
            isDone,
        });

        res.status(200).json({
            task: {
                id: updatedTask.id,
                title: updatedTask.title,
                description: updatedTask.description,
                isDone: updatedTask.isDone,
                updatedAt: updatedTask.updatedAt,
            }
        });
    } catch (error) {
        console.error(error);
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


