<template>
  <!-- En-tête de la page, contenant le logo, le texte d'information et le sélecteur de langue -->
  <header class="flex flex-col sm:flex-row justify-between items-center p-4 text-white border-b-2 border-white" data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="1500">
    <!-- Logo de l'application -->
    <div class="flex items-center space-x-2 mb-4 sm:mb-0">
      <!-- Image du logo avec un alt descriptif -->
      <img src="@/assets/logo/logo_white.webp" alt="Logo" class="h-10" />
    </div>

    <!-- Section du texte d'information, centré -->
    <div class="text-center flex-1 mb-4 sm:mb-0">
      <!-- Texte dynamique basé sur les traductions (i18n) -->
      <span class="text-lg">{{ $t('message.info') }}</span>
    </div>

    <!-- Sélecteur de langue pour changer la langue de l'interface -->
    <div class="w-full sm:w-auto">
      <!-- Liste déroulante pour sélectionner la langue, liée à la variable selectedLanguage -->
      <select v-model="selectedLanguage" @change="changeLanguage" class="w-full sm:w-auto lang-select p-2 rounded-md bg-primary text-white border-dark">
        <option value="fr">Français</option>
        <option value="en">English</option>
      </select>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'Header',  // Nom du composant Vue
  setup() {
    // Utilisation de Vue I18n pour gérer les langues
    const { locale } = useI18n();
    const selectedLanguage = ref(locale.value);  // Variable qui garde la langue sélectionnée

    // Fonction pour changer la langue de l'interface
    const changeLanguage = () => {
      locale.value = selectedLanguage.value;  // Changer la locale selon la sélection
    };

    return {
      selectedLanguage,  // Rendre la variable accessible dans le template
      changeLanguage     // Rendre la fonction accessible dans le template
    };
  }
});
</script>

<style scoped>
/* Styles pour le sélecteur de langue */
.lang-select:after {
  background-size: 0.7rem;  /* Taille de l'icône dans le select */
  background-position: right 0.7rem center;  /* Positionnement de l'icône */
}
</style>
