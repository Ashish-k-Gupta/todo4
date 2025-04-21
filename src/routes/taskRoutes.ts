import express from 'express'
import { createTask, updateTask,  } from '../controllers/taskController'
import { protect } from '../middlewares/authMiddleware'

const taskRoute = express.Router()

taskRoute.post('/',protect, createTask)
taskRoute.put('/:id', protect, updateTask)
taskRoute.get('/',protect, getTask )

export default taskRoute;