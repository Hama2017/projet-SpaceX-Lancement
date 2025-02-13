<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { fetchNextLaunch } from '@/services/LaunchService';
import { Launch } from '@/models/Launch';

// Utilisation de vue-i18n pour la gestion de la traduction
const { t } = useI18n();

// Déclaration des variables réactives pour stocker les données du lancement, le compte à rebours et la date formatée
const launch = ref<Launch | null>(null);
const countdown = ref('');
const formattedLaunchDate = ref('');

// Fonction pour mettre à jour le compte à rebours
const updateCountdown = () => {
  if (!launch.value) return;

  // Calcul de la date de lancement et ajout de 3 ans pour simuler un lancement fictif
  const launchTime = new Date(launch.value.date_utc);
  launchTime.setFullYear(launchTime.getFullYear() + 3);
  const launchTimestampFake = launchTime.getTime();
  const now = new Date().getTime();
  const diff = launchTimestampFake - now;

  // Si le lancement est déjà passé, afficher un message
  if (diff <= 0) {
    countdown.value = t('message.launchCompleted');
    return;
  }

  // Calcul du nombre de jours, heures, minutes et secondes restant
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  // Mise à jour du compte à rebours
  countdown.value = `${days} : ${hours} : ${minutes} : ${seconds}`;
};

// Fonction qui s'exécute lors du montage du composant
onMounted(async () => {
  try {
    // Récupération des données du prochain lancement via le service fetchNextLaunch
    launch.value = await fetchNextLaunch();
    console.log('Next launch data:', launch.value);

    // Si les données du lancement sont disponibles, formater la date du lancement
    if (launch.value) {
      const launchTime = new Date(launch.value.date_utc);
      launchTime.setFullYear(launchTime.getFullYear() + 3);

      // Formatage de la date de lancement en français
      formattedLaunchDate.value = launchTime.toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      });

      // Initialiser le compte à rebours et mettre à jour chaque seconde
      updateCountdown();
      setInterval(updateCountdown, 1000);
    }
  } catch (error) {
    console.error('Erreur lors de la récupération du prochain lancement:', error);
  }
});
</script>

<template>
  <div class="p-4 pb-1" data-aos="flip-up" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
    <div class="rounded-lg bg-primary p-6">
      <!-- Titre avec le nom de la mission -->
      <h2 class="text-left text-2xl font-bold text-white mb-6 uppercase">{{ t('message.nextLaunch') }}</h2>

      <!-- Affichage des informations du lancement si les données sont disponibles -->
      <div v-if="launch" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div class="bg-dark p-4 rounded-md">
          <p class="text-accent text-sm uppercase">{{ t('message.missionName') }}</p>
          <p class="text-white text-2xl mt-2">{{ launch.name }}</p>
        </div>
        <div class="bg-dark p-4 rounded-md">
          <p class="text-accent text-sm uppercase">{{ t('message.launchDate') }}</p>
          <!-- Affichage de la date formatée du lancement -->
          <p class="text-white text-2xl mt-2">{{ formattedLaunchDate }}</p>
        </div>
        <div class="bg-dark p-4 rounded-md flex flex-col items-center">
          <p class="text-white text-3xl">{{ countdown }}</p>
          <p class="text-accent text-sm mt-2">{{ t('message.countdown') }}</p>
        </div>
      </div>

      <!-- Affichage d'une image liée au lancement -->
      <div class="mt-6">
        <img src="@/assets/Home/img1.webp" alt="Lancement Image" class="w-full rounded-md">
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Ajouter des styles spécifiques si nécessaire */
</style>
