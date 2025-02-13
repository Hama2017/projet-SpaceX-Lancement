<template>
  <div>
    <!-- Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-primary bg-opacity-90 z-50 flex justify-center items-center">
      <div class="bg-primary rounded-lg p-6 w-11/12 sm:w-3/4 lg:w-1/2 border-2 border-dark"
           data-aos="zoom-in-up"
           data-aos-easing="ease-out-cubic"
           data-aos-duration="2000">

        <!-- Conteneur du titre et du bouton de fermeture -->
        <div class="flex justify-between items-center mb-6">
          <!-- Titre de la mission -->
          <h2 class="text-white text-xl font-semibold uppercase">{{ mission.name }}</h2>

          <!-- Bouton pour fermer le modal -->
          <button @click="closeModal" class="bg-dark text-white px-6 py-3 rounded-lg hover:bg-black focus:outline-none uppercase">
            {{ t('message.closeModal') }}
          </button>
        </div>

        <!-- Contenu du modal -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Colonne 1: Image de la mission -->
          <div class="flex flex-col justify-items-center">
            <img :src="mission.links.patch.large" alt="Mission Badge" class="mb-4 w-200 h-200 object-contain">
          </div>

          <!-- Colonne 2: Détails de la mission -->
          <div class="flex flex-col items-start">
            <!-- Date de lancement -->
            <p class="text-accent text-sm uppercase">{{ t('message.launchDate') }}</p>
            <p class="text-white">{{ new Date(mission.date_utc).toLocaleDateString() }}</p>

            <!-- Détails supplémentaires sur la mission -->
            <p class="text-accent text-sm mt-4 uppercase">{{ t('message.missionDetails') }}</p>
            <p class="text-white">{{ mission.details || t('message.noInfo') }}</p>

            <!-- Lien vers l'article lié à la mission -->
            <p class="text-accent text-sm mt-4 uppercase">{{ t('message.articleLink') }}</p>
            <a v-if="mission.links.article"
               :href="mission.links.article"
               target="_blank"
               class="bg-dark text-white px-4 py-2 rounded-lg mt-4 w-full hover:bg-black focus:outline-none text-center">
              {{ t('message.articleLink') }}
            </a>
            <p v-else class="text-white">{{ t('message.noArticle') }}</p>

            <!-- Affichage vidéo YouTube -->
            <p class="text-accent text-sm mt-4 uppercase">{{ t('message.showVideo') }}</p>
            <label class="switch mt-2">
              <input type="checkbox" v-model="showVideo">
              <span class="slider round"></span>
            </label>
          </div>

          <!-- Colonne 3: Lieu de lancement, Chargements envoyés et Clients -->
          <div class="flex flex-col items-start">
            <!-- Lieu de lancement de la mission -->
            <p class="text-accent text-sm uppercase">{{ t('message.launchSite') }}</p>
            <p class="text-white">{{ launchpadName }}</p>

            <!-- Liste des payloads envoyés -->
            <p class="text-accent text-sm mt-4 uppercase">{{ t('message.payloads') }}</p>
            <ul class="text-white list-disc pl-5">
              <li v-for="payload in payloadDetails" :key="payload.id">
                {{ payload.name }} ({{ payload.type }})
              </li>
            </ul>

            <!-- Liste des clients -->
            <p class="text-accent text-sm mt-4 uppercase">{{ t('message.customers') }}</p>
            <ul class="text-white list-disc pl-5">
              <li v-for="(customer, index) in allCustomers" :key="index">
                {{ customer }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Section vidéo YouTube -->
        <div v-if="showVideo" class="mt-6">
          <iframe
              v-if="mission.links.youtube_id"
              width="100%"
              height="315"
              :src="`https://www.youtube.com/embed/${mission.links.youtube_id}`"
              allowfullscreen
              class="rounded-lg">
          </iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { fetchLaunchpad } from '@/services/LaunchpadService';
import { fetchPayload } from '@/services/PayloadService';

// Définir les props et événements
const props = defineProps({
  mission: {
    type: Object,
    required: true,
  }
});

const emit = defineEmits(['close']);
const { t } = useI18n();

// Variables réactives pour le modal
const isModalOpen = ref(true);
const showVideo = ref(false);
const launchpadName = ref(t('message.loading'));
const payloadDetails = ref([]);
const allCustomers = ref([]);

// Fonction pour charger les données supplémentaires (lancement et payloads)
const loadAdditionalData = async () => {
  try {
    // Charger les informations du site de lancement
    const launchpad = await fetchLaunchpad(props.mission.launchpad);
    launchpadName.value = launchpad.full_name || t('message.noInfo');

    // Charger les informations sur les payloads
    const payloadPromises = props.mission.payloads.map(id => fetchPayload(id));
    payloadDetails.value = await Promise.all(payloadPromises);

    // Récupérer les clients des payloads
    allCustomers.value = [
      ...new Set(
          payloadDetails.value.flatMap(payload => payload.customers || []).filter(Boolean)
      )
    ];
  } catch (error) {
    console.error('Erreur de chargement des données:', error);
    launchpadName.value = t('message.noInfo');
    payloadDetails.value = [];
    allCustomers.value = [];
  }
};

// Regarder les changements de la mission pour recharger les données
watch(() => props.mission, async (newMission) => {
  if (newMission) {
    await loadAdditionalData();
    isModalOpen.value = true; // Réinitialiser la propriété isModalOpen
  }
}, { immediate: true });

// Fonction pour fermer le modal
const closeModal = () => {
  isModalOpen.value = false;
  emit('close');
};
</script>

<style scoped>
/* Style pour le switch du bouton vidéo */
.switch {
  position: relative;
  display: inline-block;
  width: 34px;
  height: 20px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 12px;
  width: 12px;
  border-radius: 50%;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #000;
}

input:checked + .slider:before {
  transform: translateX(14px);
}
</style>
