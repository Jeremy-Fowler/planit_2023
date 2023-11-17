<template>
  <div>
    <div class="d-flex align-items-center">
      <i v-if="taskProp.isComplete" class="mdi fs-2 mdi-checkbox-marked" :title="`${taskProp.name} is complete`"></i>
      <i v-else class="mdi fs-2 mdi-checkbox-blank-outline" :title="`${taskProp.name} is not yet complete`"></i>
      <button @click="setActiveTask()" data-bs-toggle="offcanvas" data-bs-target="#taskDetailsOffcanvas"
        class="btn rounded-pill px-3 py-1 ms-3 mb-0 fs-5" :class="'btn-' + randomColorProp"
        :title="`Show details for ${taskProp.name}`">
        {{ taskProp.name }}
      </button>
      <i v-if="account.id == taskProp.creatorId" @click="destroyTask()" role="button" type="button"
        class="mdi mdi-delete-forever fs-2 ms-3" :title="`Delete ${taskProp.name}`"></i>
    </div>
    <div class="ms-5">
      <i class="mdi mdi-run"></i>
      <span>Created - {{ taskProp.createdAt.toLocaleDateString() }}</span>
      <span v-if="taskProp.completedOn"> | Completed - {{ taskProp.completedOn.toLocaleDateString() }}</span>
      <div class="d-flex">
        <p :title="`${taskProp.name} has ${noteCount} notes`">
          {{ noteCount }} <i class="mdi mdi-message text-info"></i>
        </p>
        <p :title="`${taskProp.name} has a weight of ${taskProp.weight}`" class="ms-4">
          {{ taskProp.weight }} <i class="mdi mdi-weight text-info"></i>
        </p>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from 'vue';
import { Task } from '../models/Task.js';
import { tasksService } from '../services/TasksService.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js'

export default {
  props: {
    taskProp: { type: Task, required: true },
    randomColorProp: { type: String, required: true }
  },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      noteCount: computed(() => AppState.notes.filter(note => note.taskId == props.taskProp.id).length),
      async destroyTask() {
        try {
          const wantsToDelete = await Pop.confirm(`Are you sure you want to delete ${props.taskProp.name}?`)
          if (!wantsToDelete) { return }

          await tasksService.destroyTask(props.taskProp.id)
        } catch (error) {
          Pop.error(error)
        }
      },
      setActiveTask() {
        tasksService.setActiveTask(props.taskProp)
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>