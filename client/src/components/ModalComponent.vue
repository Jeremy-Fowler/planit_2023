<template>
  <div class="modal fade" :id="modalId" tabindex="-1" :aria-labelledby="modalId + 'Label'" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content" :class="modalSize">
        <div class="modal-header">
          <h1 class="modal-title fs-5" :id="modalId + 'Label'">Create Sprint</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>


        <div class="modal-body">
          ...
        </div>
        <div v-if="showFooter" class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary">Create</button>
        </div>

      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    modalId: { type: String, required: true },
    modalSize: { type: String, default: '' },
    showFooter: { type: Boolean, default: true }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped></style>