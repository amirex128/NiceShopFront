<template>
  <v-locale-provider rtl>
    <VitePwaManifest/>
    <NuxtLoadingIndicator/>
    <NuxtLayout>
      <v-app>
        <div class="h-full">
          <v-snackbar
              :timeout="3000"
              :color="toast.color"
              location="top right"
              v-model="toast.active"
          >
            {{ toast.text }}
            <template v-slot:actions>
              <v-btn
                  color="white"
                  icon="mdi-close"
                  variant="text"
                  @click="toast.active = false"
              >
              </v-btn>
            </template>
          </v-snackbar>
          <NuxtPage/>
        </div>
      </v-app>
    </NuxtLayout>
  </v-locale-provider>
</template>
<script setup lang="ts">
let toast = useToast();
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}

.layout-enter-from,
.layout-leave-to {
  filter: grayscale(1);
}
</style>