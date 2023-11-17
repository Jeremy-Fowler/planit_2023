<template>
  <div class="sprint-border">

    <div class="d-block d-md-flex justify-content-between ">

      <div class="d-flex align-items-center mb-3 mb-md-0">
        <button data-bs-toggle="collapse" :data-bs-target="'#collapse' + sprintProp.id" class="btn btn-outline-dark me-3"
          :title="`Show tasks for ${sprintProp.name}`">
          <i class="mdi mdi-rhombus-split" :class="'text-' + randomColor"></i>
        </button>
        <h3 class="mb-0">
          <span>{{ sprintProp.name }}</span>
        </h3>
        <span class="fs-4 ms-3" :title="`Combined weight of ${combinedTaskWeight}`">
          <i class="mdi mdi-weight"></i>
          {{ combinedTaskWeight }}
        </span>
      </div>

      <div class="d-flex align-items-center">
        <button data-bs-toggle="modal" data-bs-target="#taskFormModal" data-bs @click="setActiveSprint()"
          class="btn btn-info me-3">
          Add Task <i class="mdi mdi-plus"></i>
        </button>
        <span>{{ tasks.filter(task => task.isComplete).length }} / {{ tasks.length }} Tasks complete</span>
      </div>

    </div>

    <div class="collapse" :id="'collapse' + sprintProp.id">
      <div v-if="tasks.length > 0" class="container-fluid pt-3">
        <section class="row">
          <div v-for="task in tasks" :key="task.id" class="col-12 mb-3">
            <TaskListItem :taskProp="task" :randomColorProp="randomColor" />
          </div>
        </section>
      </div>
      <div v-else class="container-fluid">
        <section class="row">
          <div class="col-12">
            No tasks yet...
          </div>
        </section>
      </div>
    </div>

  </div>
</template>


<script>
import { computed } from 'vue';
import { Sprint } from '../models/Sprint.js';
import { sprintsService } from '../services/SprintsService.js';
import { AppState } from '../AppState.js';
import TaskListItem from './TaskListItem.vue';

export default {
  props: {
    sprintProp: { type: Sprint, required: true }
  },
  setup(props) {
    function getRandomColor() {
      const colors = [
        'success',
        'info',
        'warning',
        'danger',
        'primary',
      ];
      const randomIndex = Math.floor(Math.random() * colors.length);
      return colors[randomIndex];
    }
    return {
      randomColor: getRandomColor(),
      tasks: computed(() => AppState.tasks.filter(task => task.sprintId == props.sprintProp.id)),
      combinedTaskWeight: computed(() => {
        let total = 0
        const tasks = AppState.tasks.filter(task => task.sprintId == props.sprintProp.id)
        tasks.forEach(task => total += task.weight)
        return total
      }),
      setActiveSprint() {
        sprintsService.setActiveSprint(props.sprintProp);
      }
    };
  },
  components: { TaskListItem }
}
</script>


<style lang="scss" scoped>
.sprint-border {
  border: 1px solid purple;
  border-radius: 15px;
  padding: 1em;
}
</style>