import { AppState } from "../AppState.js"
import { Task } from "../models/Task.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TasksService {
  async createTask(taskData) {
    const res = await api.post('api/tasks', taskData)
    logger.log('CREATED TASK', res.data)
    const newTask = new Task(res.data)
    AppState.tasks.push(newTask)
  }

  async getTasksByProjectId(projectId) {
    const res = await api.get(`api/projects/${projectId}/tasks`)
    logger.log('GOT TASKS', res.data)
    const newTasks = res.data.map(pojo => new Task(pojo))
    AppState.tasks = newTasks
  }
  async destroyTask(taskId) {
    const res = await api.delete(`api/tasks/${taskId}`)
    logger.log('DESTROYED TASK', res.data)
    const taskIndex = AppState.tasks.findIndex(task => task.id == taskId)
    if (taskIndex == -1) { throw new Error(`No task found with the id of ${taskId}`) }
    AppState.tasks.splice(taskIndex, 1)
  }

  async updateTask(taskData) {
    const res = await api.put(`api/tasks/${taskData.id}`, taskData)
    logger.log('UPDATED TASK', res.data)
    const newTask = new Task(res.data)
    AppState.activeTask = newTask
    const taskIndex = AppState.tasks.findIndex(task => task.id == newTask.id)
    if (taskIndex == -1) { throw new Error(`Not task found with the id of ${newTask.id}`) }
    AppState.tasks.splice(taskIndex, 1, newTask)
  }

  setActiveTask(task) {
    AppState.activeTask = task
  }

  changeEditStatus(wantsToEdit) {
    AppState.isEditingTask = wantsToEdit
  }
}

export const tasksService = new TasksService()