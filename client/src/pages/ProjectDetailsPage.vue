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
      <div class="col-12 d-flex justify-content-between align-items-end mb-3">
        <div>
          <h2 class="fs-4 text-info">Sprints</h2>
          <p class="mb-0">Group your tasks into sprints for over-arching collections for better organization.</p>
        </div>
        <button data-bs-toggle="modal" data-bs-target="#sprintFormModal" class="btn btn-info px-5">Add Sprint</button>
      </div>
      <div v-for="sprint in sprints" :key="sprint.id" class="col-12 mb-3">
        <SprintCollapse :sprintProp="sprint" />
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

  <ModalComponent :modalId="'sprintFormModal'">

    <template #modalHeader>Create Sprint</template>
    <template #modalBody>
      <SprintForm />
    </template>

  </ModalComponent>

  <ModalComponent :modalId="'taskFormModal'" :modalSize="'modal-lg'">

    <template #modalHeader>Create Task</template>
    <template #modalBody>
      <TaskForm />
    </template>

  </ModalComponent>

  <OffcanvasComponent :offcanvasId="'taskDetailsOffcanvas'" :offcanvasPlacement="'offcanvas-end'">
    <template v-if="activeTask" #offcanvasTitle>
      {{ activeTask.name }}
    </template>

    <template #offcanvasBody>

    </template>
  </OffcanvasComponent>
</template>


<script>
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Pop from '../utils/Pop.js';
import { projectsService } from '../services/ProjectsService.js';
import { AppState } from '../AppState.js'
import { sprintsService } from '../services/SprintsService.js';
import ModalComponent from '../components/ModalComponent.vue';
import SprintForm from '../components/SprintForm.vue';
import SprintCollapse from '../components/SprintCollapse.vue';
import TaskForm from '../components/TaskForm.vue';
import { tasksService } from '../services/TasksService.js';
import { notesService } from '../services/NotesService.js';
import OffcanvasComponent from '../components/OffcanvasComponent.vue';
export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const watchableProjectId = ref(route.params.projectId);

    watch(watchableProjectId, () => {
      getProjectById();
      getSprintsByProjectId();
      getTasksByProjectId();
      getNotesByProjectId();
    }, { immediate: true });

    async function getProjectById() {
      try {
        const projectId = watchableProjectId.value;
        await projectsService.getProjectById(projectId);
      }
      catch (error) {
        Pop.error((error));
      }
    }
    async function getSprintsByProjectId() {
      try {
        const projectId = watchableProjectId.value;
        await sprintsService.getSprintsByProjectId(projectId);
      }
      catch (error) {
        Pop.error(error);
      }
    }
    async function getTasksByProjectId() {
      try {
        const projectId = watchableProjectId.value;
        await tasksService.getTasksByProjectId(projectId)
      } catch (error) {
        Pop.error(error)
      }
    }
    async function getNotesByProjectId() {
      try {
        const projectId = watchableProjectId.value;
        await notesService.getNotesByProjectId(projectId)
      } catch (error) {
        Pop.error(error)
      }
    }
    return {
      project: computed(() => AppState.activeProject),
      account: computed(() => AppState.account),
      sprints: computed(() => AppState.sprints),
      activeTask: computed(() => AppState.activeTask),
      async destroyProject() {
        try {
          const project = AppState.activeProject;
          const wantsToDelete = await Pop.confirm(`Are you sure that you want to delete ${project.name}?`);
          if (!wantsToDelete) {
            return;
          }
          await projectsService.destroyProject(project.id);
          Pop.success('Deleted project!');
          router.push({ name: 'Home' });
        }
        catch (error) {
          Pop.error(error);
        }
      },
    };
  },
  components: { ModalComponent, SprintForm, SprintCollapse, TaskForm, OffcanvasComponent }
}
</script>


<style lang="scss" scoped></style>