<template>
  <div class="col-4">
    <router-link :title="`See details about ${projectProp.name}`"
      :to="{ name: 'ProjectDetails', params: { projectId: projectProp.id } }">
      <p>{{ projectProp.name }}</p>
    </router-link>
  </div>
  <div class="col-4">
    <img :src="projectProp.creator.picture" alt="Creator">
  </div>
  <div class="col-4">
    <p>{{ projectProp.createdAt.toLocaleDateString() }}</p>
  </div>
</template>


<script>
import { Project } from '../models/Project.js';

export default {
  props: { projectProp: { type: Project, required: true } },
  setup() {
    return {}
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