<template>
  <div class="offcanvas" :class="offcanvasPlacement" tabindex="-1" :id="offcanvasId"
    :aria-labelledby="offcanvasId + 'Label'">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" :id="offcanvasId + 'Label'">

        <slot name="offcanvasTitle"></slot>

      </h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">

      <slot name="offcanvasBody"></slot>

    </div>
  </div>
</template>


<script>
export default {
  props: {
    offcanvasId: { type: String, required: true },
    offcanvasPlacement: { type: String, default: 'offcanvas-start' }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped></style>