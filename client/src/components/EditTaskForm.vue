<template>
  <form @submit.prevent="updateTask()">
    <div class="mb-3">
      <label for="taskName" class="form-label">Task Name</label>
      <input v-model="editable.name" type="text" class="form-control" id="taskName" required maxlength="50"
        placeholder="Task Name...">
    </div>
    <div class="mb-3">
      <label for="taskWeight" class="form-label">Task Weight <i class="mdi mdi-weight text-info"></i></label>
      <input v-model="editable.weight" type="number" class="form-control" id="taskWeight" required min="1" max="5"
        placeholder="Task Weight...">
    </div>
    <div class="d-flex justify-content-between mb-3">
      <button @click="editable.isComplete = false" class="btn rounded-pill px-4"
        :class="editable.isComplete ? 'btn-outline-info' : 'btn-info'" type="button"
        :title="`Set ${editable.name}'s status to incomplete`">
        Pending
      </button>
      <button @click="editable.isComplete = true" class="btn rounded-pill px-4"
        :class="editable.isComplete ? 'btn-info' : 'btn-outline-info'" type="button"
        :title="`Set ${editable.name}'s status to complete`">
        Done
      </button>
    </div>
    <div class="mb-3">
      <label for="taskWeight" class="form-label">Sprint <i class="mdi mdi-run text-info"></i></label>
      <select v-model="editable.sprintId" id="taskWeight" class="form-select">
        <option v-for="sprint in sprints" :key="sprint.id" :value="sprint.id">{{ sprint.name }}</option>
      </select>
    </div>
    <div class="text-end">
      <button @click="stopEditing()" class="btn btn-outline-dark me-2" type="button">Cancel</button>
      <button type="submit" class="btn btn-success">Save Changes</button>
    </div>
  </form>
</template>


<script>
import { computed, onMounted, ref } from 'vue';
import { AppState } from '../AppState.js';
import { tasksService } from '../services/TasksService.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {
    const editable = ref({})
    function setEditable() {
      editable.value = { ...AppState.activeTask }
    }
    onMounted(() => {
      setEditable()
    })

    return {
      editable,
      sprints: computed(() => AppState.sprints),
      stopEditing() {
        setEditable()
        tasksService.changeEditStatus(false)
      },
      async updateTask() {
        try {
          const taskData = editable.value
          await tasksService.updateTask(taskData)
          this.stopEditing()
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>