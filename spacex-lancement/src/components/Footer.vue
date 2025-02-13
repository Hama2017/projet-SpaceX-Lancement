<script setup lang="ts">
import { useI18n } from 'vue-i18n'; // Importation de useI18n pour la gestion des traductions

// Initialisation de la fonction t pour accéder aux traductions
const { t } = useI18n();
</script>

<template>
  <!-- Section footer, avec un fond sombre et du texte centré -->
  <footer class="bg-gray-900 text-gray-400 text-center bg-primary py-4 mt-10">
    <!-- Affichage du texte de pied de page, traduit via Vue I18n -->
    <p>{{ t('message.footerText') }}</p>
  </footer>
</template>

<style scoped>
/* Pas de style supplémentaire ajouté pour l'instant */
</style>
