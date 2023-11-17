<template>
  <div v-if="account.id" class="container-fluid">
    <section class="row">
      <div class="col-12 d-flex justify-content-center align-items-center">
        <img :src="account.picture" alt="Your account picture">
        <div class="ms-3">
          <p class="fs-3">{{ account.name }}</p>
          <p v-if="account.title" class="fs-4">{{ account.title }}</p>
        </div>
      </div>
      <div class="col-12">
        <form @submit.prevent="updateAccount()">
          <div class="mb-3">
            <label for="accountName" class="form-label">Account Name</label>
            <input v-model="editable.name" type="text" class="form-control" id="accountName" required maxlength="50"
              placeholder="Account Name...">
          </div>
          <div class="mb-3">
            <label for="accountPicture" class="form-label">Account Picture</label>
            <input v-model="editable.picture" type="url" class="form-control" id="accountPicture" required maxlength="300"
              placeholder="Account Picture...">
          </div>
          <div class="mb-3">
            <label for="accountTitle" class="form-label">Account Title</label>
            <input v-model="editable.title" type="text" class="form-control" id="accountTitle" maxlength="30"
              placeholder="Account Title...">
          </div>
          <div class="text-end">
            <button type="submit" class="btn btn-success">Save changes</button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>


<script>
import { computed, ref, watch } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { accountService } from '../services/AccountService.js';

export default {
  setup() {
    const editable = ref()
    const account = computed(() => AppState.account)
    watch(account, () => {
      editable.value = { ...account.value }
    })
    return {
      editable,
      account,
      async updateAccount() {
        try {
          const accountData = editable.value
          await accountService.updateAccount(accountData)
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
  height: 10vh;
  width: 10vh;
  object-fit: cover;
  border-radius: 50%;
}
</style>