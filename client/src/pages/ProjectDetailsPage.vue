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
  <button data-bs-toggle="offcanvas" data-bs-target="#projectsNavigationOffcanvas"
    class="btn btn-info fs-1 projects-button" title="See your projects"><i
      class="mdi mdi-alpha-p-circle-outline"></i></button>


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

  <OffcanvasComponent :offcanvasId="'projectsNavigationOffcanvas'">
    <template #offcanvasTitle>
      <p class="fs-3 text-info">Projects</p>
    </template>

    <template #offcanvasBody>
      <div class="container-fluid">
        <section class="row justify-content-between">
          <div class="col-4">
            <p class="text-info">Name</p>
          </div>
          <div class="col-4">
            <p class="text-info">Started</p>
          </div>
        </section>
        <section v-for="project in myProjects" :key="project.id" class="row justify-content-between">
          <ProjectListItem :projectProp="project" />
        </section>
      </div>
    </template>
  </OffcanvasComponent>

  <OffcanvasComponent :offcanvasId="'taskDetailsOffcanvas'" :offcanvasPlacement="'offcanvas-end'">
    <template v-if="activeTask" #offcanvasTitle>
      {{ activeTask.name }}
    </template>

    <template #offcanvasBody>

    </template>
  </OffcanvasComponent>
</template>


<script>
import { computed, watch } from 'vue';
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
import ProjectListItem from '../components/ProjectListItem.vue';
export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const watchableProjectId = computed(() => route.params.projectId);

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
      myProjects: computed(() => AppState.myProjects),
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
  components: { ModalComponent, SprintForm, SprintCollapse, TaskForm, OffcanvasComponent, ProjectListItem }
}
</script>


<style lang="scss" scoped>
.projects-button {
  position: absolute;
  left: 0;
  top: 10%;
}

@media(max-width: 768px) {
  .projects-button {
    position: static;
  }
}
</style>