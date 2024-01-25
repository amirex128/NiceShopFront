<template>
  <v-container>
    <v-file-input
        chips
        multiple
        variant="outlined"
        label="آپلود تصاویر"
        v-model="selectedFiles"
    ></v-file-input>
    <v-btn class="mb-5"
           elevation="1"
           prepend-icon="mdi-upload"
           @click="submitForm"
           block
           variant="tonal">
      ذخیره
    </v-btn>
    <v-infinite-scroll
        :items="images"
        :onLoad="loadImages"
        load-more-text="بارگذاری بیشتر"
        empty-text="موردی یافت نشد"
    >
      <div class="grid grid-cols-6 gap-4 ">
        <div class="" v-for="(item, index) in images" :key="item">
          <div class="image-container m-2 rounded-2xl shadow">
            <v-img
                :src="runtimeConfig.public.baseBackendURL + item.relativePath"
                cover
                aspect-ratio="1"
                class="bg-grey-lighten-2 rounded-2xl"
            >
              <template v-slot:placeholder>
                <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                >
                  <v-progress-circular
                      indeterminate
                      color="grey-lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
            <div class="image-overlay rounded-2xl shadow">
              <v-btn size="small" variant="tonal" color="primary" @click="openEditDialog(item)">ویرایش</v-btn>
              <v-btn class="mr-1" size="small" variant="tonal" color="error" @click="openDeleteDialog(item.id)">حذف
              </v-btn>
            </div>
          </div>
        </div>
      </div>
    </v-infinite-scroll>
    <v-dialog v-model="deleteDialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">آیا از حذف این مورد مطمئن هستید؟</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="tonal" color="green darken-1" text @click="deleteDialog = false">خیر</v-btn>
          <v-btn variant="tonal" color="red darken-1" text @click="deleteImage">بله</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="editDialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">ویرایش تصویر</v-card-title>
        <v-card-text>
          <v-text-field variant="outlined" v-model="altToEdit" label="Alt"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="tonal" color="green darken-1" text @click="editDialog = false">لغو</v-btn>
          <v-btn variant="tonal" color="red darken-1" text @click="updateImage">ذخیره</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import {useMyFetch} from '@/composables/useMyFetch'

let images = ref([])
let pageNumber = ref(1)
let pageSize = ref(10)
let deleteDialog = ref(false)
let imageToDelete = ref(null)
let selectedFiles = ref(null)
let runtimeConfig = useRuntimeConfig();
let editDialog = ref(false)
let imageToEdit = ref(null)
let altToEdit = ref('')

async function openEditDialog(item) {
  imageToEdit.value = item.id
  const { data } = await useMyFetch(`Medias/Get/${item.id}`);
  if (data && data.value) {
    altToEdit.value = data.value.alt;
  }
  editDialog.value = true;
}

async function updateImage() {
  if (imageToEdit.value) {
    await useMyFetch(`Medias/Update`, {method: 'PUT', body: {id: imageToEdit.value, alt: altToEdit.value}})
    imageToEdit.value = ''
    editDialog.value = false
  }
}

async function loadImages({done}, reset = false) {
  if (reset) {
    images.value = []
    pageNumber.value = 1
  }
  const {data} = await useMyFetch(`Medias/GetAll?PageNumber=${pageNumber.value}&PageSize=${pageSize.value}`)
  if (data && data.value && data.value.items && data.value.items.length > 0) {
    images.value = [...images.value, ...data.value.items]
    pageNumber.value++
    done('ok')
  } else {
    done('empty')
  }
}

function openDeleteDialog(id) {
  imageToDelete.value = id
  deleteDialog.value = true
}

async function deleteImage() {
  if (imageToDelete.value) {
    await useMyFetch(`Medias/Delete/${imageToDelete.value}`, {method: 'DELETE'})
    images.value = images.value.filter(image => image.id !== imageToDelete.value)
    deleteDialog.value = false
  }
}

async function submitForm() {
  const formData = new FormData()
  for (let i = 0; i < selectedFiles.value.length; i++) {
    formData.append('File', selectedFiles.value[i])
    formData.append('Alt', '') // add Alt value
  }
  await useMyFetch('Medias/Create', {method: 'POST', body: formData})
  loadImages({done: true}, true)
  selectedFiles.value = null
}

</script>

<style scoped>
.image-container {
  position: relative;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-container:hover .image-overlay {
  opacity: 1;
}
</style>