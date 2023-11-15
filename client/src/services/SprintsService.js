import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class SprintsService {
  async getSprintsByProjectId(projectId) {
    const res = await api.get(`api/projects/${projectId}/sprints`)
    logger.log('GOT SPRINTS', res.data)
  }
}

export const sprintsService = new SprintsService()