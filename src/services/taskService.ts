import { AppDataSource } from "../data-source";
import { Task } from "../entity/taskEntity";
import { User } from "../entity/userEntity";
import { AppError } from "../utils/errorHandler";


export class TaskService{
    static async createTask(title: string, description: string, isDone: boolean, user: User): Promise<Task>{
        try{
            const userRepo = AppDataSource.getRepository(User)
            const existingUser = await userRepo.findOne({where: {id: user.id}})

            if(!existingUser){
                throw new AppError("User not found", 404)
            }

            const taskRepo = AppDataSource.getRepository(Task)
            const task = taskRepo.create({title, description, isDone, user})
            return await taskRepo.save(task);

        } catch (error: any) {
            throw new AppError(error.message || "Failed to create task", 500);
        }

    }


    static async updateTask(taskId: string,  updates: Partial<Pick<Task, 'title'| 'description' |'isDone'>>):Promise<Task>{
        try{
        const taskRepo = AppDataSource.getRepository(Task);
        const task = await taskRepo.findOne({where: {id: taskId}, relations:['user']});


        if(!task){
            throw new AppError("Task not found", 404)
        }

       if(updates.title !== undefined) task.title = updates.title
       if (updates.description !== undefined) task.description = updates.description;
        if (updates.isDone !== undefined) task.isDone = updates.isDone;
        return await taskRepo.save(task);

    }
    catch (error: any) {
        throw new AppError(error.message || "Failed to update task", 500);
    }
}

   





    static async getTasks(userId: string):Promise<Task[]>{
        try{
            const taskRepo = AppDataSource.getRepository(Task)
            const allTask = await taskRepo.find(
                {
                    where: {user: {id: userId}},
                    relations: ["user"]
                });

                if (allTask.length === 0) {
                    throw new AppError("No tasks found for this user", 404);
                }
                return allTask
                
            }catch (error: any) {
            throw new AppError(error.message || "Failed to retrieve tasks", 500);
        }
        }
}