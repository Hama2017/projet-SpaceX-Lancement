<template>
  <div id="app">
    <!-- Conteneur principal de l'application avec un fond noir -->
    <div class="min-h-screen bg-center bg-black">

      <!-- Composant d'en-tête -->
      <Header />

      <!-- Contenu principal avec padding ajusté en fonction de la taille de l'écran -->
      <main class="flex-1 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-[300px] py-2">
        <!-- Composant principal (Home) affiché ici -->
        <Home />
      </main>

      <!-- Composant de pied de page -->
      <Footer />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'; // Importation de la fonction pour définir un composant Vue
import Header from '@/components/Header.vue'; // Importation du composant Header
import Footer from '@/components/Footer.vue'; // Importation du composant Footer
import Home from "./views/Home.vue"; // Importation de la vue Home

export default defineComponent({
  name: 'App', // Nom du composant
  components: {
    Home, // Composant Home
    Header, // Composant Header
    Footer // Composant Footer
  }
});
</script>
