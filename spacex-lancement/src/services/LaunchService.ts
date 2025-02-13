import axios from 'axios'; // Importation d'axios pour effectuer des requêtes HTTP
import type {Launch} from "@/models/Launch.ts"; // Importation du modèle Launch

// Constantes représentant les URL de base de l'API SpaceX
const BASE_URL = 'https://api.spacexdata.com/v4/launches/query'; // URL pour récupérer les lancements
const NEXT_LAUNCH_URL = 'https://api.spacexdata.com/v4/launches/latest'; // URL pour récupérer le prochain lancement

// Fonction pour récupérer les lancements en fonction du filtre (réussis, échoués, ou tous)
export const fetchLaunches = async (filter: string): Promise<Launch[]> => {
    try {
        // Définition de la requête de filtre initiale, recherche par succès
        const query: any = { success: { $ne: null } };

        // Modifie le filtre en fonction de l'argument `filter`
        if (filter === 'reussis') {
            query.success = true; // On filtre uniquement les lancements réussis
        } else if (filter === 'echoues') {
            query.success = false; // On filtre uniquement les lancements échoués
        }

        // Requête HTTP POST pour récupérer les lancements en fonction du filtre
        const response = await axios.post(BASE_URL, {
            query,
            options: { sort: { date_utc: 'desc' }, limit: 10 }, // Tri par date décroissante et limite à 10 résultats
        });

        // Retourne les données des lancements
        return response.data.docs;
    } catch (error) {
        // Si une erreur survient, on l'affiche dans la console et on retourne un tableau vide
        console.error('Erreur lors de la récupération des missions:', error);
        return [];
    }
};

// Fonction pour récupérer les données d'un lancement spécifique par son ID
export const fetchOneLaunch = async (id: string): Promise<Launch> => {
    try {
        // Requête HTTP GET pour récupérer un lancement spécifique
        const response = await axios.get<Launch>(`https://api.spacexdata.com/v4/launches/${id}`);
        return response.data; // Retourne les données du lancement
    } catch (error) {
        // Si une erreur survient, on lance une erreur avec un message spécifique
        throw new Error('Mission non trouvée');
    }
};

// Fonction pour récupérer les données du prochain lancement
export const fetchNextLaunch = async (): Promise<LaunchData | null> => {
    try {
        // Requête HTTP GET pour récupérer le prochain lancement
        const response = await axios.get<LaunchData>(NEXT_LAUNCH_URL);
        return response.data; // Retourne les données du prochain lancement
    } catch (error) {
        // Si une erreur survient, on l'affiche dans la console et on retourne null
        console.error('Erreur lors de la récupération du prochain lancement:', error);
        return null;
    }
};
