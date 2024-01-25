<template>
  <v-btn variant="tonal" color="secondary" block @click="openDialog">انتخاب تصاویر</v-btn>

  <v-dialog v-model="dialog" class="w-10/12">
    <v-card>
      <v-card-title class="headline">انتخاب تصاویر</v-card-title>
      <v-card-text>
        <v-infinite-scroll :items="images" :onLoad="loadImages">
          <div class="grid grid-cols-6 gap-4 ">
            <div class="image-container m-2 rounded-2xl shadow" v-for="(image, index) in images" :key="image">
              <v-img
                  :src="runtimeConfig.public.baseBackendURL + image.relativePath"
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
              <div class="image-overlay rounded-2xl shadow" :class="{ 'selected': isSelected(index) }">
                <v-btn size="small" variant="flat" color="info" @click="toggleSelection(image, index)">
                  {{ isSelected(index) ? 'حذف' : 'انتخاب' }}
                </v-btn>
              </div>
            </div>
          </div>
        </v-infinite-scroll>
      </v-card-text>
    </v-card>
  </v-dialog>

  <div class="grid grid-cols-6 gap-4 bg-gray-100 rounded-2xl p-2 mt-3 shadow-md">
    <div class="image-container m-2 rounded-2xl shadow" v-for="(selectedImage, index) in selectedImages" :key="selectedImage.image">
      <v-img
          :src="runtimeConfig.public.baseBackendURL + selectedImage.image.relativePath"
          cover
          aspect-ratio="1"
          class="bg-grey-lighten-2 rounded-2xl"
      ></v-img>
      <div class="image-overlay rounded-2xl shadow">
        <v-btn size="small" variant="flat" color="info"
               @click="toggleSelection(selectedImage.image, selectedImage.index)">حذف
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useMyFetch} from '@/composables/useMyFetch'

let images = ref([])
let selectedImages = ref([])
let pageNumber = ref(1)
let pageSize = ref(10)
let dialog = ref(false)
let runtimeConfig = useRuntimeConfig();

function openDialog() {
  dialog.value = true
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

function toggleSelection(item, index) {
  if (isSelected(index)) {
    removeImage(index)
  } else {
    selectImage(item, index)
  }
}

function selectImage(item, index) {
  selectedImages.value.push({image: item, index: index})
}

function removeImage(index) {
  selectedImages.value = selectedImages.value.filter(selectedImage => selectedImage.index !== index)
}

function isSelected(index) {
  return selectedImages.value.some(selectedImage => selectedImage.index === index)
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

.image-container:hover .image-overlay,
.image-overlay.selected {
  opacity: 1;
}
</style>