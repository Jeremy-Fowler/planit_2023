<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12">
        <p>Status</p>
        <div class="d-flex justify-content-between">
          <button class="btn" :class="task.isComplete ? 'btn-outline-info' : 'btn-info'">Pending</button>
          <button class="btn" :class="task.isComplete ? 'btn-outline-info' : 'btn-info'">Done</button>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import { computed } from 'vue';
import { AppState } from '../AppState.js';

export default {
  setup() {
    return {
      task: computed(() => AppState.activeTask)
    }
  }
}
</script>


<style lang="scss" scoped></style>