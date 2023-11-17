import { AppState } from "../AppState.js"
import { Note } from "../models/Note.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class NotesService {
  async getNotesByProjectId(projectId) {
    const res = await api.get(`api/projects/${projectId}/notes`)
    logger.log('GOT NOTES', res.data)
    const newNotes = res.data.map(pojo => new Note(pojo))
    AppState.notes = newNotes
  }

  async createNote(noteData) {
    const res = await api.post('api/notes', noteData)
    logger.log('CREATED NOTE', res.data)
    const newNote = new Note(res.data)
    AppState.notes.push(newNote)
  }
  async destroyNote(noteId) {
    const res = await api.delete(`api/notes/${noteId}`)
    logger.log('DESTROYED NOTE', res.data)
    const noteIndex = AppState.notes.findIndex(note => note.id == noteId)
    if (noteIndex == -1) { throw new Error(`No note found with the id of ${noteId}`) }
    AppState.notes.splice(noteIndex, 1)
  }
}

export const notesService = new NotesService()