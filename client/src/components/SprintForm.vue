<template>
  <form @submit.prevent="createSprint()">
    <div class="mb-3">
      <label for="sprintName" class="form-label">Sprint Name</label>
      <input v-model="editable.name" type="text" class="form-control" id="sprintName" required maxlength="40"
        placeholder="Sprint Name...">
    </div>

    <div class="text-end">
      <button type="submit" class="btn btn-success">Create</button>
    </div>
  </form>
</template>


<script>
import { ref } from 'vue';
import Pop from '../utils/Pop.js';
import { sprintsService } from '../services/SprintsService.js';
import { useRoute } from 'vue-router';
import { Modal } from 'bootstrap';

export default {
  setup() {
    const editable = ref({})
    const route = useRoute()
    return {
      editable,
      async createSprint() {
        try {
          const sprintData = editable.value
          sprintData.projectId = route.params.projectId
          await sprintsService.createSprint(sprintData)
          editable.value = {}
          Modal.getOrCreateInstance('#sprintFormModal').hide()
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>