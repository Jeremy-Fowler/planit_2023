import { AppState } from "../AppState.js"
import { Sprint } from "../models/Sprint.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class SprintsService {
  async getSprintsByProjectId(projectId) {
    const res = await api.get(`api/projects/${projectId}/sprints`)
    logger.log('GOT SPRINTS', res.data)
    const newSprints = res.data.map(pojo => new Sprint(pojo))
    AppState.sprints = newSprints
  }

  async createSprint(sprintData) {
    const res = await api.post('api/sprints', sprintData)
    logger.log('CREATED SPRINT', res.data)
    const newSprint = new Sprint(res.data)
    AppState.sprints.push(newSprint)
  }

  setActiveSprint(sprint) {
    AppState.activeSprint = sprint
  }
}

export const sprintsService = new SprintsService()