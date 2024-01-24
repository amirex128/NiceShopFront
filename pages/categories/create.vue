<template>
  <v-container>
    <v-form ref="form" @submit.prevent="submitForm">
      <v-text-field
          variant="outlined"
          v-model="formData.name"
          label="Name"
          :rules="[v => !!v || 'Name is required']"
          required
      ></v-text-field>
      <v-textarea
          variant="outlined"
          v-model="formData.description"
          label="Description"
          :rules="[v => !!v || 'Description is required']"
          required
      ></v-textarea>
      <v-text-field
          variant="outlined"
          v-model="formData.Slug"
          label="Slug"
          :rules="[v => !!v || 'Slug is required', v => /^[\w-]+$/.test(v) || 'Invalid slug format']"
          required
      ></v-text-field>
      <v-combobox
          variant="outlined"
          v-model="formData.seoTags"
          label="SEO Tags"
          multiple
          chips
          deletable-chips
          :rules="[v => !!v.length || 'At least one SEO tag is required']"
      ></v-combobox>
      <v-select
          variant="outlined"
          v-model="formData.medias"
          :items="mediaItems"
          item-text="path"
          item-value="id"
          label="Medias"
          multiple
          :rules="[v => !!v.length || 'At least one media is required']"
      ></v-select>
      <v-btn type="submit">Submit</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {useMyFetch} from '~/composables/useMyFetch.js';
import {useRouter} from 'vue-router';

const formData = ref({
  name: '',
  description: '',
  Slug: '',
  seoTags: [],
  medias: []
});

const mediaItems = ref([]);

const router = useRouter();

onMounted(async () => {
  const {data} = await useMyFetch('Medias/GetAll',{});
  mediaItems.value = data;
});

const submitForm = async () => {
  if (formData.value.name && formData.value.description && formData.value.Slug) {
    const {error} = await useMyFetch('Categories/Create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData.value),
    });

    if (!error.value) {
      router.push('/categories');
    }
  }
};
</script>