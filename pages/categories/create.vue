<template>
  <v-container>
    <div>
      <v-text-field
          variant="outlined"
          v-model="formData.name"
          label="Name"
          :rules="[v => !!v || 'Name is required']"
          requiredclass="mb-3"

      ></v-text-field>

      <v-text-field
          variant="outlined"
          v-model="formData.slug"
          label="Slug"
          :rules="[v => !!v || 'Slug is required', v => /^[\w-]+$/.test(v) || 'Invalid slug format']"
          required
          class="mb-3"
      ></v-text-field>
      <v-combobox
          variant="outlined"
          v-model="formData.seoTags"
          label="SEO Tags"
          multiple
          chips
          deletable-chips
          :rules="[v => !!v.length || 'At least one SEO tag is required']"
          class="mb-3"
      ></v-combobox>
      <QuillEditor
          toolbar="full"
          theme="snow"
          dir="rtl"
          class="mb-3 h-80 border"
          contentType="html"
          v-model:content="formData.description"
      />
      <media-select v-model="formData.medias"/>

      <v-btn class="my-4"
             elevation="1"
             prepend-icon="mdi-plus"
             @click="submitForm"
             variant="tonal">
        ذخیره
      </v-btn>
    </div>
  </v-container>
</template>

<script setup>
import {QuillEditor} from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import MediaSelect from "~/components/mediaSelect.vue";

const formData = reactive({
  name: '',
  description: '',
  parentCategoryId: null,
  slug: '',
  seoTags: [],
  medias: []
});

const router = useRouter();

const submitForm = async () => {

  const {error} = await useMyFetch('Categories/Create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...formData,
      medias: formData.medias.map(item => item.id),
    }),
  });

  if (!error.value) {
    router.push('/categories');
  }

};
</script>