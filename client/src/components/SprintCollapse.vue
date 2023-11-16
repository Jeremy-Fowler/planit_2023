<template>
  <div class="sprint-border">

    <div class="d-block d-md-flex justify-content-between">

      <div class="d-flex align-items-center">
        <button data-bs-toggle="collapse" :data-bs-target="'#collapse' + sprintProp.id" class="btn btn-outline-dark me-3"
          :title="`Show tasks for ${sprintProp.name}`">
          <i class="mdi mdi-rhombus-split" :class="randomTextColor"></i>
        </button>
        <h3 class="mb-0">
          <span>{{ sprintProp.name }}</span>
        </h3>
        <span class="fs-4 ms-3">
          <i class="mdi mdi-weight"></i>
          10
        </span>
      </div>

      <div class="d-flex align-items-center">
        <button class="btn btn-info me-3">Add Task <i class="mdi mdi-plus"></i></button>
        <span>0 / 0 Tasks complete</span>
      </div>
    </div>

    <div class="collapse mt-3" :id="'collapse' + sprintProp.id">
      <div class="card card-body">
        Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user
        activates the relevant trigger.
      </div>
    </div>
  </div>
</template>


<script>
import { Sprint } from '../models/Sprint.js';

export default {
  props: {
    sprintProp: { type: Sprint, required: true }
  },
  setup() {
    return {
      get randomTextColor() {
        const colors = [
          'text-success',
          'text-info',
          'text-warning',
          'text-danger',
          'text-primary',
        ]

        const randomIndex = Math.floor(Math.random() * colors.length)
        return colors[randomIndex]
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.sprint-border {
  border: 1px solid purple;
  border-radius: 15px;
  padding: 1em;
}
</style>