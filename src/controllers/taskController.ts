import { Request, Response, NextFunction } from "express";
import { TaskService } from "../services/taskService";
import { AppError } from "../utils/errorHandler";
import { title } from "process";

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

export const getTask = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const userId = req.user?.id

        if(!userId){
            res.status(401).json({message: 'Unauthorized'})
            return;
        }
        const tasks = await TaskService.getTasks(userId);

        if (tasks.length === 0) {
             res.status(200).json({ message: 'No tasks found', tasks: [] });
        }

        const minimalTasks = tasks.map(task =>({
            id: task.id,
            title: task.title,
            description: task.description,
            isDone: task.isDone
        }))
        res.status(200).json({tasks: minimalTasks})
    }catch(error){
        next(error)
    }
}

export const updateTask = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { title, description, isDone } = req.body;
        const userId = req.user.id;
        const taskId = req.params.id;

        if (!userId) {
            throw new AppError("User not authenticated", 401);
        }

        const updatedTask = await TaskService.updateTask(taskId, {
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
            res.status(error.statusCode).json({ message: error.message });
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const userId = req.user?.id;
        const taskId = req.params.id;

        if (!userId) {
            throw new AppError("User not authenticated", 401);
        }
        if(!taskId){
            throw new AppError("Task does not exists", 401);
        }
        const deletedTask = await TaskService.deleteTask(userId, taskId);

        res.status(200).json({
          message: "Task deleted successfully",
          task: deletedTask
        });
    }
    catch(error){
        next(error);
    }
}