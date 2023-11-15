<template>
  <div v-if="project" class="container">
    <section class="row">
      <div class="col-12 mt-3">
        <h1>
          {{ project.name }}
          <i v-if="account.id == project.creatorId" @click="destroyProject()" :title="`Delete ${project.name}`"
            role="button" type="button" class="ms-2 mdi mdi-delete-forever text-info"></i>
        </h1>
        <p>{{ project.description }}</p>
      </div>
    </section>
  </div>
  <div v-else class="container">
    <section class="row">
      <div class="col-12 mt-3">
        <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
      </div>
    </section>
  </div>
</template>


<script>
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Pop from '../utils/Pop.js';
import { projectsService } from '../services/ProjectsService.js';
import { AppState } from '../AppState.js'
export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const watchableProjectId = ref(route.params.projectId)
    watch(watchableProjectId, () => {
      getProjectById()
    },
      { immediate: true }
    )
    async function getProjectById() {
      try {
        const projectId = watchableProjectId.value
        await projectsService.getProjectById(projectId)
      } catch (error) {
        Pop.error((error))
      }
    }
    return {
      project: computed(() => AppState.activeProject),
      account: computed(() => AppState.account),
      async destroyProject() {
        try {
          const project = AppState.activeProject
          const wantsToDelete = await Pop.confirm(`Are you sure that you want to delete ${project.name}?`)
          if (!wantsToDelete) { return }
          await projectsService.destroyProject(project.id)
          Pop.success('Deleted project!')
          router.push({ name: 'Home' })
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>