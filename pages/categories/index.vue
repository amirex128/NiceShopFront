<template>
  <v-container>
    <v-alert elevation="3" color="blue" title="لیست دسته بندی ها">
      در این لیست شما تمامی دسته بندی های موجود برای مقالات و محصولات را مشاهده میکنید
    </v-alert>
    <v-btn class="my-4"
           elevation="1"
           prepend-icon="mdi-plus"
           @click="router.push({path:`/categories/create`})"
           variant="tonal">
      ایجاد دسته بندی
    </v-btn>
    <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        :search="search"
        :headers="headers"
        :items-length="totalItems"
        :items="serverItems"
        :loading="loading"
        item-value="name"
        @update:options="loadItems"
        loading-text="در حال بارگذاری ..."
        no-data-text="داده ای برای نمایش وجود ندارد"
        no-results-text="موردی یافت نشد"
        items-per-page-text="تعداد در هر صفحه"
        rows-per-page-text="ردیف در هر صفحه"
    >
      <template v-slot:tfoot>
        <tr>
          <td>
            <v-text-field v-model="search" hide-details placeholder="جستجو ..." class="ma-2"
                          density="compact"></v-text-field>
          </td>
        </tr>
      </template>
      <template v-slot:item.edit="{ item }">
        <v-btn variant="tonal" size="small" color="primary" icon @click="editItem(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>
      <template v-slot:item.delete="{ item }">
        <v-btn variant="tonal" size="small" color="error" icon @click="openDeleteDialog(item)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table-server>

    <v-dialog v-model="deleteDialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">آیا از حذف این مورد مطمئن هستید؟</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="tonal" color="green darken-1" text @click="deleteDialog = false">خیر</v-btn>
          <v-btn variant="tonal" color="red darken-1" text @click="deleteItem">بله</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import {ref} from 'vue'
import {useMyFetch} from '@/composables/useMyFetch'

const itemsPerPage = ref(5)
const headers = ref([
  {title: 'Category ID', key: 'id', align: 'start'},
  {title: 'Name', key: 'name', align: 'start'},
  {title: 'Parent Category ID', key: 'parentCategoryId', align: 'start'},
  {title: 'Description', key: 'description', align: 'start'},
  {title: 'Edit', key: 'edit', align: 'end'},
  {title: 'Delete', key: 'delete', align: 'end'},
])
const serverItems = ref([])
const loading = ref(true)
const totalItems = ref(0)
const search = ref('')
const router = useRouter()
const deleteDialog = ref(false)
let itemToDelete = ref(null)

async function loadItems({page, itemsPerPage}) {
  loading.value = true
  const {data} = await useMyFetch('Categories/GetAll', {
    method: 'GET',
    params: {
      PageNumber: page,
      PageSize: itemsPerPage,
      Search: search.value
    }
  })
  serverItems.value = data.value.items
  totalItems.value = data.value.totalCount
  loading.value = false
}

const editItem = (item) => {
  router.push({path: `/categories/${item.id}`})
}

const openDeleteDialog = (item) => {
  itemToDelete.value = item
  deleteDialog.value = true
}

const deleteItem = async () => {
  if (itemToDelete.value) {
    const {error} = await useMyFetch(`Categories/Delete/${itemToDelete.value.id}`, {method: 'DELETE'})
    if (!error.value) {
      loadItems({page: 1, itemsPerPage: itemsPerPage.value}) // reload items
    }
    deleteDialog.value = false
  }
}
</script>