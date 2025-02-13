# Guide de Déploiement - SpaceX Lancement

## Prérequis
Assurez-vous d'avoir installé les outils suivants sur votre machine :

- [Node.js](https://nodejs.org/) (v16 ou plus recommandé)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

## 1. Cloner le projet
```sh
git clone https://github.com/ton-repo/spacex-lancement.git
cd spacex-lancement
```

## 2. Installer les dépendances
```sh
npm install
```

## 3. Configuration des variables d'environnement
Créez un fichier `.env` à la racine du projet et ajoutez-y les variables nécessaires :
```sh
VITE_API_URL=https://api.spacexdata.com/v4
```

## 4. Lancer le projet en mode développement
```sh
npm run dev
```
Cela démarre un serveur local accessible généralement à `http://localhost:5173/`.

## 5. Construction pour la production
```sh
npm run build
```
Cela génère les fichiers optimisés dans le dossier `dist/`.

## 6. Déploiement sur un hébergeur statique
### Option 1 : Déploiement sur Vercel

1. Installez Vercel CLI si ce n'est pas encore fait :
   ```sh
   npm install -g vercel
   ```
2. Connectez-vous à Vercel :
   ```sh
   vercel login
   ```
3. Déployez le projet :
   ```sh
   vercel
   ```

### Option 2 : Déploiement sur Netlify

1. Installez Netlify CLI :
   ```sh
   npm install -g netlify-cli
   ```
2. Connectez-vous à Netlify :
   ```sh
   netlify login
   ```
3. Déployez le projet :
   ```sh
   netlify deploy --prod
   ```

### Option 3 : Déploiement sur GitHub Pages

1. Installez `gh-pages` :
   ```sh
   npm install --save-dev gh-pages
   ```
2. Ajoutez ces lignes dans `package.json` :
   ```json
   "scripts": {
     "deploy": "gh-pages -d dist"
   }
   ```
3. Exécutez :
   ```sh
   npm run build
   npm run deploy
   ```

## 7. Vérification post-déploiement
Après le déploiement, testez votre application pour vérifier que tout fonctionne correctement.

---

Ton projet **SpaceX Lancement** est maintenant déployé avec succès ! 🚀🎉

