import axios from 'axios'; // Importation d'axios pour effectuer des requêtes HTTP
import { Launchpad } from '@/models/Launchpad'; // Importation du modèle Launchpad

// Fonction pour récupérer les informations d'un launchpad spécifique par son ID
export const fetchLaunchpad = async (id: string): Promise<Launchpad> => {
    try {
        // Requête HTTP GET pour récupérer un launchpad spécifique via son ID
        const response = await axios.get<Launchpad>(`https://api.spacexdata.com/v4/launchpads/${id}`);
        return response.data; // Retourne les données du launchpad
    } catch (error) {
        // Si une erreur survient (par exemple, ID invalide ou données non trouvées), une erreur est lancée
        throw new Error('Launchpad non trouvé');
    }
};
