import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class NotesService {
  async getNotesByProjectId(projectId) {
    const res = await api.get(`api/projects/${projectId}/notes`)
    logger.log('GOT NOTES', res.data)
  }
}

export const notesService = new NotesService()