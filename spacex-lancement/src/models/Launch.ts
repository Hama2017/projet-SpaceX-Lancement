// Définition de l'interface Launch
export interface Launch {
    id: string;                     // Identifiant unique de la mission de lancement
    name: string;                   // Nom de la mission de lancement
    date_utc: string;               // Date et heure UTC du lancement (au format ISO 8601)
    success: boolean | null;        // Indique si la mission a réussi (true), échoué (false) ou si le statut est inconnu (null)
    rocket: string;                 // Identifiant de la fusée utilisée pour ce lancement (référence à une fusée)
    payloads: string[];             // Liste des identifiants des charges utiles (payloads) associées à cette mission
    launchpad: string;              // Identifiant du site de lancement (référence au site de lancement)
    links: {
        patch: {
            small: string;          // URL pour l'image de petite taille du patch de la mission
            large: string;          // URL pour l'image de grande taille du patch de la mission
        };
        article: string | null;     // URL vers un article associé à cette mission, ou null s'il n'existe pas
        youtube_id: string | null;  // ID de la vidéo YouTube de la mission, ou null si aucune vidéo n'est disponible
    };
    details: string | null;         // Détails supplémentaires sur la mission, ou null si ces informations ne sont pas disponibles
}
