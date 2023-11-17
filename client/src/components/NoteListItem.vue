<template>
  <div class="note-border">
    <div class="d-flex align-items-center mb-2">
      <img :src="noteProp.creator.picture" :alt="`${noteProp.creator.name}'s profile picture'`">
      <p class="ms-2 mb-0 text-info">{{ noteProp.creator.name }}</p>
      <i v-if="account.id == noteProp.creatorId" @click="destroyNote()" class="mdi mdi-delete-forever ms-1" role="button"
        type="button" title="Delete this Note"></i>
    </div>
    <p class="mb-0">{{ noteProp.body }}</p>
  </div>
</template>


<script>
import { computed } from 'vue';
import { Note } from '../models/Note.js';
import { notesService } from '../services/NotesService.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';

export default {
  props: {
    noteProp: { type: Note, required: true }
  },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      async destroyNote() {
        try {
          const wantsToDelete = await Pop.confirm('Are you want to delete your note?')
          if (!wantsToDelete) { return }
          const noteId = props.noteProp.id
          await notesService.destroyNote(noteId)
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
img {
  height: 5vh;
  width: 5vh;
  object-fit: cover;
  border-radius: 50%;
}

.note-border {
  border: 1px solid purple;
  border-radius: 15px;
  padding: 1em;
  width: 100%;
}
</style>