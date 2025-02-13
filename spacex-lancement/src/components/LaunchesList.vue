<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'; // Importation des hooks Vue
import { useI18n } from 'vue-i18n'; // Importation pour la gestion de la localisation
import { fetchLaunches, fetchOneLaunch } from '@/services/LaunchService'; // Importation des services pour récupérer les lancements
import { fetchRocket } from '@/services/RocketService'; // Importation du service pour récupérer les fusées
import { Launch } from '@/models/Launch'; // Importation du modèle de lancement
import { Rocket } from '@/models/Rocket'; // Importation du modèle de fusée

// Initialisation des variables et des références
const { t } = useI18n(); // Fonction pour récupérer les traductions
const launches = ref<Launch[]>([]); // Liste des lancements
const selectedFilter = ref(''); // Filtre sélectionné pour afficher les lancements
const selectedLaunch = ref<Launch | null>(null); // Détails du lancement sélectionné
const isModalOpen = ref(false); // Contrôle l'ouverture du modal
const rocketImages = ref<{ [key: string]: string }>({}); // Stocke les images des fusées par nom
const hoveredRocket = ref<{ [key: string]: boolean }>({}); // Suivi de l'état de survol pour chaque carte de lancement

// Mapping des images des fusées en fonction de leur nom
const rocketImageMap: { [key: string]: string } = {
  'Falcon Heavy': 'src/assets/Home/falcon-heavy.webp',
  'Falcon 9': 'src/assets/Home/falcon-9.webp',
  'Falcon 1': 'src/assets/Home/falcon-1.webp',
};

// Image par défaut si la fusée n'est pas trouvée
const defaultImageRocket = 'src/assets/Home/falcon-9.webp';

// Fonction pour charger les lancements en fonction du filtre sélectionné
const loadLaunches = async () => {
  try {
    launches.value = await fetchLaunches(selectedFilter.value); // Récupérer les lancements depuis l'API
    console.log('Launches loaded:', launches.value);
    await loadRocketImages(); // Charger les images des fusées pour chaque lancement
  } catch (error) {
    console.error('Erreur lors du chargement des lancements:', error);
  }
};

// Fonction pour charger les images des fusées
const loadRocketImages = async () => {
  // Pour chaque lancement, récupérer l'image de la fusée
  for (const launch of launches.value) {
    if (launch.rocket && !rocketImages.value[launch.rocket]) {
      try {
        const rocket: Rocket = await fetchRocket(launch.rocket); // Récupérer la fusée depuis l'API
        rocketImages.value[launch.rocket] = rocketImageMap[rocket.name] || defaultImageRocket; // Mapper l'image de la fusée
      } catch (error) {
        console.error('Erreur de chargement de la fusée:', error);
        rocketImages.value[launch.rocket] = defaultImageRocket; // Utiliser l'image par défaut en cas d'erreur
      }
    }
  }
  console.log('Rocket images loaded:', rocketImages.value); // Afficher les images des fusées chargées
};

// Fonction pour charger les détails d'un lancement spécifique
const loadLaunchDetails = async (id: string) => {
  try {
    selectedLaunch.value = await fetchOneLaunch(id); // Récupérer les détails du lancement
    isModalOpen.value = true; // Ouvrir le modal avec les détails du lancement
  } catch (error) {
    console.error('Erreur lors du chargement des détails du lancement:', error);
  }
};

// Charger les lancements au montage du composant
onMounted(loadLaunches);

// Observer le filtre sélectionné pour charger les lancements chaque fois qu'il change
watch(selectedFilter, loadLaunches);
</script>

<template>
  <div class="p-4">
    <!-- Sélecteur de filtre pour afficher les lancements réussis, échoués ou tous -->
    <div class="mb-4" data-aos="fade-up" data-aos-duration="3000">
      <select v-model="selectedFilter" class="bg-primary text-white border-dark rounded-md p-2">
        <option value="">{{ t('message.allLaunches') }}</option>
        <option value="reussis">{{ t('message.successfulLaunches') }}</option>
        <option value="echoues">{{ t('message.failedLaunches') }}</option>
      </select>
    </div>

    <!-- Liste des lancements affichés sous forme de cartes -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Pour chaque lancement, afficher une carte avec les informations -->
      <div
          v-for="launch in launches"
          :key="launch.id"
          class="bg-primary rounded-lg p-4 flex flex-col flex-grow"
          data-aos="flip-left"
          @mouseover="hoveredRocket[launch.id] = true"
         @mouseleave="hoveredRocket[launch.id] = false"
      >
      <div class="flex flex-row items-start justify-between mb-4">
        <div class="flex flex-col">
          <img
              :src="launch.links.patch.small || '/default-image.png'"
              alt="Mission Badge"
              class="h-[150px] w-[150px] object-contain mb-4"
          />
          <p class="text-white text-lg font-semibold mb-2">{{ launch.name }}</p>
          <p class="text-accent mb-2">{{ new Date(launch.date_utc).toLocaleDateString() }}</p>

          <!-- Affichage du statut de succès ou d'échec du lancement -->
          <span v-if="launch.success === true" class="bg-success text-white text-center text-xs p-2 rounded-full w-[120px] mt-2">
              {{ t('message.successfulLaunch') }}
            </span>
          <span v-else-if="launch.success === false" class="bg-error text-white text-center text-xs p-2 rounded-full w-[120px] mt-2">
              {{ t('message.failedLaunch') }}
            </span>
        </div>

        <!-- Image de la fusée, change au survol de la carte -->
        <div class="flex-shrink-0">
          <img
              v-if="rocketImages.value && rocketImages.value[launch.rocket]"
              :src="hoveredRocket[launch.id]
                  ? rocketImages.value[launch.rocket].replace('.webp', '.gif')
                  : rocketImages.value[launch.rocket]"
              alt="Fusée"
              class="w-full md:w-auto h-[200px] object-contain"
          />
          <img
              v-else
              :src="hoveredRocket[launch.id]
                  ? defaultImageRocket.replace('.webp', '.gif')
                  : defaultImageRocket"
              alt="Fusée par défaut"
              class="w-full md:w-auto h-[200px] object-contain"
          />
        </div>
      </div>

      <!-- Bouton pour voir plus de détails sur le lancement -->
      <div class="mt-auto">
        <button
            @click="loadLaunchDetails(launch.id)"
            class="bg-dark text-white px-4 py-2 rounded-lg w-full hover:bg-black focus:outline-none uppercase"
        >
          {{ t('message.learnMore') }}
        </button>
      </div>
    </div>
  </div>


  </div>
</template>

<style scoped>
</style>
