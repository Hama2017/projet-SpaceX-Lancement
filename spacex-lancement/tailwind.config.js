/** @type {import('tailwindcss').Config} */
export default {
  // Spécification des fichiers où Tailwind doit rechercher les classes à générer
  content: [
    "./index.html", // Inclut le fichier HTML principal
    "./src/**/*.{vue,js,ts,jsx,tsx}", // Inclut tous les fichiers dans le dossier src avec les extensions vue, js, ts, jsx, et tsx
  ],

  theme: {
    // Extension du thème de Tailwind pour ajouter des personnalisations
    extend: {
      fontFamily: {
        sans: ['Share Tech Mono'], // Ajout de la police 'Share Tech Mono' comme police sans-serif
      },
      colors: {
        // Définition des couleurs personnalisées pour le projet
        primary: '#262626',       // Gris foncé, utilisé pour le fond ou les éléments principaux
        secondary: '#000000',     // Noir, utilisé pour les éléments secondaires
        accent: '#A3A3A3',        // Gris clair pour l'accent, idéal pour les éléments de mise en valeur
        light: '#F3F4F6',         // Gris très clair, utilisé pour les arrière-plans légers
        dark: '#404040',          // Gris très foncé, utilisé pour les éléments en contraste
        success: '#19532e',       // Vert de succès, utilisé pour les messages de succès
        warning: '#F59E0B',       // Jaune de warning, utilisé pour les messages d'avertissement
        error: '#EF4444',         // Rouge d'erreur, utilisé pour les messages d'erreur
      },
    },
  },

  plugins: [
    // Les plugins peuvent être ajoutés ici pour étendre la fonctionnalité de Tailwind CSS
  ],
}
