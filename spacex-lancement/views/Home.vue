<template>
  <div>
    <NextLaunch />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import NextLaunch from '@/components/NextLaunch.vue';
import { Launch } from '@/models/Launch';
export default defineComponent({
  name: 'Home',
  components: {
    NextLaunch,
  },
});
</script>

<style scoped>
/* Ajouter des styles spécifiques si nécessaire */
</style>
