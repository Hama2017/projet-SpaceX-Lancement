# Projet-SpaceX-Lancement
Application (Vue 3 + TypeScript) affichant les lancements SpaceX via l’API publique SpaceX v5
Pour installer **Tailwind CSS version 3.4.1** dans votre projet Vue.js 3 avec Vite, voici les étapes détaillées à suivre :
---

## 🛠️ Étapes pour installer Tailwind CSS 3.4.1

### 1. **Créer un projet Vue.js 3 avec Vite**
   Si vous n'avez pas encore créé votre projet Vue.js, exécutez la commande suivante :
   ```bash
   npm init vite@latest my-spacex-app -- --template vue-ts
   ```
   - `my-spacex-app` : Nom du projet (vous pouvez le changer).
   - `--template vue-ts` : Utilise le template Vue.js avec TypeScript.

   Ensuite, accédez au dossier du projet :
   ```bash
   cd my-spacex-app
   ```

---

### 2. **Installer Tailwind CSS 3.4.1**
   Tailwind CSS nécessite quelques dépendances pour fonctionner correctement. Installez-les avec la commande suivante :
   ```bash
   npm install -D tailwindcss@3.4.1 postcss autoprefixer
   ```

---

### 3. **Configurer Tailwind CSS**
   - Initialisez la configuration de Tailwind CSS :
     ```bash
     npx tailwindcss init -p
     ```
     Cela créera deux fichiers :
     - `tailwind.config.js` : Fichier de configuration de Tailwind CSS.
     - `postcss.config.js` : Fichier de configuration de PostCSS (nécessaire pour Tailwind).

   - Ouvrez le fichier `tailwind.config.js` et configurez-le pour analyser vos fichiers Vue et TypeScript :
     ```javascript
     module.exports = {
       content: [
         "./index.html",
         "./src/**/*.{vue,js,ts,jsx,tsx}",
       ],
       theme: {
         extend: {},
       },
       plugins: [],
     }
     ```

---

### 4. **Ajouter les directives Tailwind à votre CSS**
   - Créez un fichier `src/assets/tailwind.css` et ajoutez les directives Tailwind suivantes :
     ```css
     @tailwind base;
     @tailwind components;
     @tailwind utilities;
     ```

   - Importez ce fichier dans votre point d'entrée principal (`src/main.ts`) :
     ```typescript
     import './assets/tailwind.css';
     ```

---

### 5. **Vérifier l'installation**
   - Démarrez le serveur de développement pour vérifier que Tailwind CSS fonctionne correctement :
     ```bash
     npm run dev
     ```
   - Ouvrez votre navigateur à l'adresse `http://localhost:3000` et vérifiez que les styles Tailwind sont appliqués.

---

## 🚀 Étapes pour développer l'application SpaceX

### 1. **Créer la structure du projet**
   Organisez votre projet comme suit :
   ```
   src/
   ├── assets/          # Images, polices, etc.
   ├── components/      # Composants Vue réutilisables
   ├── services/        # Services pour interagir avec l'API SpaceX
   ├── views/           # Pages de l'application
   ├── App.vue          # Composant principal
   └── main.ts          # Point d'entrée de l'application
   ```

---

### 2. **Créer un service pour l'API SpaceX**
   - Créez un fichier `src/services/SpaceXService.ts` pour interagir avec l'API SpaceX :
     ```typescript
     import axios from 'axios';

     const BASE_URL = 'https://api.spacexdata.com/v5';

     export const getNextLaunch = async () => {
       const response = await axios.get(`${BASE_URL}/launches/next`);
       return response.data;
     };

     export const getPastLaunches = async () => {
       const response = await axios.get(`${BASE_URL}/launches/past`);
       return response.data;
     };

     export const getLaunchDetails = async (id: string) => {
       const response = await axios.get(`${BASE_URL}/launches/${id}`);
       return response.data;
     };
     ```

---

### 3. **Créer les composants Vue**
   - **NextLaunch.vue** : Affiche le prochain lancement et un compte à rebours.
   - **LaunchesList.vue** : Affiche la liste des lancements avec un filtre.
   - **LaunchModal.vue** : Affiche les détails d'un lancement dans un modal.

---

### 4. **Utiliser Tailwind CSS pour le design**
   - Utilisez les classes Tailwind pour styliser vos composants. Par exemple :
     ```html
     <div class="bg-gray-800 text-white p-4 rounded-lg">
       <h1 class="text-2xl font-bold">Prochain lancement</h1>
       <p class="text-lg">{{ nextLaunch.name }}</p>
     </div>
     ```

---

### 5. **Ajouter des animations**
   - Utilisez une bibliothèque comme [GSAP](https://greensock.com/gsap/) ou [Animate.css](https://animate.style/) pour ajouter des animations.

---

### 6. **Intégrer YouTube Embed**
   - Utilisez la balise `<iframe>` pour intégrer des vidéos YouTube. Par exemple :
     ```html
     <iframe
       width="560"
       height="315"
       :src="`https://www.youtube.com/embed/${videoId}`"
       frameborder="0"
       allowfullscreen
     ></iframe>
     ```

---

### 7. **Tester et déployer**
   - Testez votre application localement avec `npm run dev`.
   - Pour déployer, vous pouvez utiliser [Vercel](https://vercel.com/) ou [Netlify](https://www.netlify.com/).

---

## 📝 Rapport et rendu
1. **Code source** : Publiez votre code sur un dépôt Git (GitHub, GitLab, etc.).
2. **Rapport** : Rédigez un rapport expliquant :
   - Les difficultés rencontrées.
   - Les choix techniques (pourquoi Vue.js, Tailwind, etc.).
   - Les ressources utilisées (documentation, tutoriels, etc.).
3. **Guide de déploiement** : Fournissez des instructions pour déployer l'application.

---

## 📄 Exemple de structure finale
```
my-spacex-app/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── NextLaunch.vue
│   │   ├── LaunchesList.vue
│   │   └── LaunchModal.vue
│   ├── services/
│   │   └── SpaceXService.ts
│   ├── views/
│   │   └── Home.vue
│   ├── App.vue
│   └── main.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── package.json
```

---

Avec ces étapes, vous avez maintenant un projet Vue.js 3 avec **Tailwind CSS 3.4.1** correctement configuré. Vous pouvez commencer à développer votre application SpaceX en suivant les objectifs et les fonctionnalités demandées. Bonne chance ! 🚀
