<template>
  <v-btn variant="tonal" color="secondary" block @click="openDialog">انتخاب تصاویر</v-btn>

  <v-dialog v-model="dialog" class="w-10/12">
    <v-card>
      <v-card-title class="headline">انتخاب تصاویر</v-card-title>
      <v-card-text>
        <v-infinite-scroll :items="images" :onLoad="loadImages">
          <div class="grid grid-cols-6 gap-4">
            <div class="image-container m-2 rounded-2xl shadow" v-for="(image) in images" :key="image.id">
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
              <div v-if="isSelected(image)" class="image-overlay rounded-2xl shadow selected">
                <v-btn size="small" variant="flat" color="info" @click="toggleSelection(image)">
                  حذف
                </v-btn>
              </div>
              <div v-else class="image-overlay rounded-2xl shadow">
                <v-btn size="small" variant="flat" color="info" @click="toggleSelection(image)">
                  انتخاب
                </v-btn>
              </div>
            </div>
          </div>
        </v-infinite-scroll>
      </v-card-text>
    </v-card>
  </v-dialog>

  <div class="grid grid-cols-6 gap-4 bg-gray-100 rounded-2xl p-2 mt-3 shadow-md">
    <div class="image-container m-2 rounded-2xl shadow" v-for="(selectedImage) in selectedImages"
         :key="selectedImage.id">
      <v-img
          :src="runtimeConfig.public.baseBackendURL + selectedImage.relativePath"
          cover
          aspect-ratio="1"
          class="bg-grey-lighten-2 rounded-2xl"
      ></v-img>
      <div class="image-overlay rounded-2xl shadow">
        <v-btn size="small" variant="flat" color="info"
               @click="toggleSelection(selectedImage)">حذف
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useMyFetch} from '@/composables/useMyFetch'

let images = ref([])
let selectedImages = reactive([])
let pageNumber = ref(1)
let pageSize = ref(50)
let dialog = ref(false)
let runtimeConfig = useRuntimeConfig();

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  }
})

let stopWatch = watch(() => props.modelValue, (value) => {
  selectedImages = reactive(value);
  stopWatch(); // Stop the watcher after the first change
});

const emit = defineEmits(['update:modelValue'])

function openDialog() {
  dialog.value = true
}

async function loadImages({done}) {
  const {data} = await useMyFetch(`Medias/GetAll?PageNumber=${pageNumber.value}&PageSize=${pageSize.value}`)
  if (data && data.value && data.value.items && data.value.items.length > 0) {
    images.value = [...images.value, ...data.value.items]
    pageNumber.value++
    if (data.value.items.length < pageSize.value) {
      done('empty')
    } else {
      done('ok')
    }
  } else {
    done('empty')
  }
}

function toggleSelection(image) {
  if (isSelected(image)) {
    removeImage(image)
  } else {
    selectImage(image)
  }
}

function selectImage(image) {
  selectedImages.push(image);
  emit('update:modelValue', selectedImages)
}

function removeImage(image) {
  const index = selectedImages.findIndex(selectedImage => selectedImage.id === image.id);
  if (index !== -1) {
    selectedImages.splice(index, 1);
    emit('update:modelValue', selectedImages)
  }
}

let selectedImageIds = computed(() => {
  return new Set(selectedImages.map(image => image.id));
});

function isSelected(image) {
  return selectedImageIds.value.has(image.id);
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