<template>
  <div class="col-4">
    <router-link :title="`See details about ${projectProp.name}`"
      :to="{ name: 'ProjectDetails', params: { projectId: projectProp.id } }">
      <p v-if="route.name == 'Home'">{{ projectProp.name }}</p>
      <p v-else data-bs-dismiss="offcanvas">{{ projectProp.name }}</p>
    </router-link>
  </div>
  <div v-if="route.name == 'Home'" class="col-4">
    <img :src="projectProp.creator.picture" alt="Creator">
  </div>
  <div class="col-4">
    <p>{{ projectProp.createdAt.toLocaleDateString() }}</p>
  </div>
</template>


<script>
import { useRoute } from 'vue-router';
import { Project } from '../models/Project.js';

export default {
  props: { projectProp: { type: Project, required: true } },
  setup() {
    const route = useRoute()
    return {
      route
    }
  }
}
</script>


<style lang="scss" scoped>
img {
  border-radius: 50%;
  height: 5vh;
  width: 5vh;
  border: 2px solid black;
}
</style>