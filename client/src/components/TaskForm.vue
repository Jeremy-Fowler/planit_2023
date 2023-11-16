<template>
  <form @submit.prevent="createTask()">
    <div class="container-fluid">
      <section class="row">
        <div class="col-md-6">
          <div class="mb-3">
            <label for="taskName" class="form-label">Task Name</label>
            <input v-model="editable.name" type="text" class="form-control" id="taskName" required maxlength="50"
              placeholder="Task Name...">
          </div>
        </div>
        <div class="col-md-6">
          <div class="mb-3">
            <label for="taskWeight" class="form-label">Task Weight</label>
            <input v-model="editable.weight" type="number" class="form-control" id="taskWeight" required min="1" max="5"
              placeholder="Task Weight...">
          </div>
        </div>
        <div class="col-12">
          <div class="text-end">
            <button type="submit" class="btn btn-success">Create</button>
          </div>
        </div>
      </section>
    </div>
  </form>
</template>


<script>
import { ref } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { tasksService } from '../services/TasksService.js';
import { Modal } from 'bootstrap';

export default {
  setup() {
    const editable = ref({})


    return {
      editable,
      async createTask() {
        try {
          const taskData = editable.value
          taskData.projectId = AppState.activeProject.id
          taskData.sprintId = AppState.activeSprint.id
          await tasksService.createTask(taskData)
          editable.value = {}
          Modal.getOrCreateInstance('#taskFormModal').hide()
        } catch (error) {
          Pop.error(error)
        }
      },

    }
  }
}
</script>


<style lang="scss" scoped></style>