<template>
  <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :search="search"
      :headers="headers"
      :items-length="totalItems"
      :items="serverItems"
      :loading="loading"
      item-value="name"
      @update:options="loadItems"
  >
    <template v-slot:tfoot>
      <tr>
        <td>
          <v-text-field v-model="search" hide-details placeholder="Search articles..." class="ma-2" density="compact"></v-text-field>
        </td>
      </tr>
    </template>
  </v-data-table-server>
</template>

<script setup>
import { ref } from 'vue'
import { useMyFetch } from '@/composables/useMyFetch' // adjust the path according to your project structure

const itemsPerPage = ref(5)
const headers = ref([
  { title: 'Article ID', key: 'id', align: 'start' },
  { title: 'Title', key: 'title', align: 'start' },
  { title: 'Category', key: 'category', align: 'start' },
  // add more headers as needed
])
const serverItems = ref([])
const loading = ref(true)
const totalItems = ref(0)
const search = ref('')

async function loadItems({ page, itemsPerPage }) {
  loading.value = true
  const { items, totalCount } = await useMyFetch('Articles/GetAll', {
    method: 'GET',
    params: {
      PageNumber: page,
      PageSize: itemsPerPage,
      Search: search.value
    }
  })
  serverItems.value = items
  totalItems.value = totalCount
  loading.value = false
}
</script>