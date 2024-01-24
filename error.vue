<script setup lang="ts">
const props = defineProps({
  error: Object
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div>
    <h2> Error code : {{ error.statusCode }}</h2>
    <h3>
      Error message :
      <br/>
      {{error.message}}
    </h3>
    <button @click="handleError">Clear errors</button>
  </div>
</template>
