<template>
  <div v-if="task" class="container-fluid">

    <section v-if="!isEditingTask" class="row">
      <div class="col-12 mb-3">
        <p>Status</p>
        <div class="d-flex justify-content-between">
          <button @click="updateTaskCompletionStatus({ isComplete: false })" class="btn rounded-pill px-4"
            :class="task.isComplete ? 'btn-outline-info' : 'btn-info'" type="button"
            :title="`Set ${task.name}'s status to incomplete`">
            Pending
          </button>
          <button @click="updateTaskCompletionStatus({ isComplete: true })" class="btn rounded-pill px-4"
            :class="task.isComplete ? 'btn-info' : 'btn-outline-info'" type="button"
            :title="`Set ${task.name}'s status to complete`">
            Done
          </button>
        </div>
      </div>
      <div class="col-12 d-flex justify-content-center mb-3">
        <h2 class="note-border-bottom text-center">Notes</h2>
      </div>
      <div class="col-12 mb-3">
        <form @submit.prevent="createNote()">
          <label for="noteBody" class="form-label">Add a Note</label>
          <div class="input-group mb-3">
            <input v-model="editable.body" id="noteBody" type="text" class="form-control" placeholder="Note Body..."
              maxlength="50" required>
            <button class="btn btn-outline-secondary" type="submit" title="Create Note">
              <i class="mdi mdi-send"></i>
            </button>
          </div>
        </form>
      </div>
      <div v-for="note in notes" :key="note.id" class="col-12 mb-3">
        <NoteListItem :noteProp="note" />
      </div>
    </section>

    <section v-else class="row">
      <div class="col-12">
        <EditTaskForm />
      </div>
    </section>

  </div>
</template>


<script>
import { computed, ref } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { tasksService } from '../services/TasksService.js';
import { notesService } from '../services/NotesService.js';
import NoteListItem from './NoteListItem.vue';
import EditTaskForm from './EditTaskForm.vue';

export default {
  setup() {
    const editable = ref({});
    return {
      editable,
      isEditingTask: computed(() => AppState.isEditingTask),
      task: computed(() => AppState.activeTask),
      notes: computed(() => AppState.notes.filter(note => note.taskId == AppState.activeTask?.id)),
      async updateTaskCompletionStatus(taskData) {
        try {
          taskData.id = AppState.activeTask.id;
          await tasksService.updateTask(taskData);
        }
        catch (error) {
          Pop.error(error);
        }
      },
      async createNote() {
        try {
          const noteData = editable.value;
          noteData.projectId = AppState.activeProject.id;
          noteData.taskId = AppState.activeTask.id;
          await notesService.createNote(noteData);
          editable.value = {};
        }
        catch (error) {
          Pop.error(error);
        }
      },
    };
  },
  components: { NoteListItem, EditTaskForm }
}
</script>


<style lang="scss" scoped>
.note-border-bottom {
  width: 80%;
  border-bottom: 1px solid black;
}
</style>