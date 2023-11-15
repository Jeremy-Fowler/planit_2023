<template>
  <div class="modal fade" id="projectFormModal" tabindex="-1" aria-labelledby="projectFormModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="projectFormModalLabel">Create Project</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form @submit.prevent="createProject()">

          <div class="modal-body">

            <div class="mb-3">
              <label for="projectName" class="form-label">Project Name</label>
              <input v-model="editable.name" type="text" class="form-control" id="projectName" required maxlength="45"
                placeholder="Project Name...">
            </div>

            <div class="mb-3">
              <label for="projectDescription" class="form-label">Project Description</label>
              <textarea v-model="editable.description" class="form-control" id="projectDescription" rows="3"
                placeholder="Project Description..." maxlength="300" required></textarea>
            </div>

          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-info">Create</button>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>


<script>
import { ref } from 'vue';
import Pop from '../utils/Pop.js';
import { projectsService } from '../services/ProjectsService.js';
import { Modal } from 'bootstrap';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const editable = ref({})
    const router = useRouter()
    return {
      editable,
      async createProject() {
        try {
          const projectData = editable.value
          const project = await projectsService.createProject(projectData)
          Modal.getOrCreateInstance('#projectFormModal').hide()
          router.push({ name: 'ProjectDetails', params: { projectId: project.id } })
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>