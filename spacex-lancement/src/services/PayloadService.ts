import axios from 'axios'; // Importation d'axios pour effectuer des requêtes HTTP
import { Payload } from '@/models/Payload'; // Importation du modèle Payload

// Fonction asynchrone pour récupérer les données d'un payload par son ID
export const fetchPayload = async (id: string): Promise<Payload> => {
    try {
        // Envoi de la requête GET à l'API SpaceX pour récupérer les informations du payload
        const response = await axios.get<Payload>(`https://api.spacexdata.com/v4/payloads/${id}`);

        // Retourne les données du payload reçues dans la réponse
        return response.data;
    } catch (error) {
        // Si une erreur survient lors de la requête, on lance une nouvelle erreur avec un message
        throw new Error('Payload non trouvé');
    }
};
