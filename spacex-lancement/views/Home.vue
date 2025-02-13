<template>
  <div>
    <NextLaunch />
    <LaunchesList @mission-selected="handleMissionSelected" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import NextLaunch from '@/components/NextLaunch.vue';
import LaunchesList from '@/components/LaunchesList.vue';
import { fetchLaunchpad } from '@/services/LaunchpadService';
import { fetchPayload } from '@/services/PayloadService';
import { fetchRocket } from '@/services/RocketService';
import { Launch } from '@/models/Launch';
import { Launchpad } from '@/models/Launchpad';
import { Payload } from '@/models/Payload';
import { Rocket } from '@/models/Rocket';
export default defineComponent({
  name: 'Home',
  components: {
    NextLaunch,
    LaunchesList,
  },
  setup() {
    const selectedMission = ref<Launch | null>(null);
    const isModalOpen = ref(false);

    const handleMissionSelected = async (mission: Launch) => {
      selectedMission.value = mission;
      await loadAdditionalData(mission);
      isModalOpen.value = true;
    };

    const loadAdditionalData = async (mission: Launch) => {
      try {
        const launchpad: Launchpad = await fetchLaunchpad(mission.launchpad);
        const payloads: Payload[] = await Promise.all(mission.payloads.map(id => fetchPayload(id)));
        const rocket: Rocket = await fetchRocket(mission.rocket);
        selectedMission.value = { ...mission, launchpad, payloads, rocket };
      } catch (error) {
        console.error('Erreur de chargement des données:', error);
      }
    };

    return {
      selectedMission,
      isModalOpen,
      handleMissionSelected,
    };
  },
});
</script>

<style scoped>
/* Ajouter des styles spécifiques si nécessaire */
</style>
