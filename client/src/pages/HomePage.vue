<template>
  <div class="container-fluid p-5">
    <section v-if="account.id" class="row main-card p-4">
      <div class="col-12 d-flex justify-content-between align-items-center mb-3">
        <div>
          <h1 class="fs-4 text-info">Projects</h1>
          <p>A list of all of the projects for {{ account.name }}</p>
        </div>
        <div class="text-end">
          <button class="btn btn-info px-5">Create Project</button>
        </div>
      </div>
      <div class="col-12">
        <section class="row mb-3 labels">
          <div class="col-4">
            <p>Name</p>
          </div>
          <div class="col-4">
            <p>Members</p>
          </div>
          <div class="col-4">
            <p>Started</p>
          </div>
        </section>
        <section v-for="project in projects" :key="project.id" class="row projects mb-3">
          <ProjectListItem :projectProp="project" />
        </section>
      </div>
    </section>
    <section v-else class="row main-card p-4">
      <div class="col-12">
        <h1 class="fs-4">Please login to start planning!</h1>
      </div>
    </section>
  </div>
</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import ProjectListItem from '../components/ProjectListItem.vue';


export default {
  setup() {
    return {
      account: computed(() => AppState.account),
      projects: computed(() => AppState.myProjects)
    };
  },
  components: { ProjectListItem }
}
</script>

<style scoped lang="scss">
.main-card {
  border-radius: 15px;
  box-shadow: 0 5px 10px rgb(132, 132, 132);
  max-height: 75vh;
}

.projects {
  overflow-y: auto;
}

.labels {
  border-bottom: 1px solid black;
}
</style>
