import express from 'express'
import { createTask, deleteTask, getTask, updateTask,  } from '../controllers/taskController'
import { protect } from '../middlewares/authMiddleware'

const taskRoute = express.Router()

taskRoute.post('/',protect, createTask)
taskRoute.put('/:id', protect, updateTask)
taskRoute.get('/',protect, getTask )
taskRoute.delete('/:id', protect, deleteTask)
export default taskRoute;