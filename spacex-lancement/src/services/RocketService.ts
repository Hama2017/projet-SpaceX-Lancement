import axios from 'axios'; // Importation d'axios pour effectuer des requêtes HTTP
import { Rocket } from '@/models/Rocket'; // Importation du modèle Rocket

// Fonction asynchrone pour récupérer les données d'une fusée par son ID
export const fetchRocket = async (id: string): Promise<Rocket> => {
    try {
        // Envoi de la requête GET à l'API SpaceX pour récupérer les informations de la fusée
        const response = await axios.get<Rocket>(`https://api.spacexdata.com/v4/rockets/${id}`);

        // Retourne les données de la fusée reçues dans la réponse
        return response.data;
    } catch (error) {
        // Si une erreur survient lors de la requête, on lance une nouvelle erreur avec un message
        throw new Error('Fusée non trouvée');
    }
};
