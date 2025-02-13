// Définition de l'interface Payload
export interface Payload {
    id: string;           // Identifiant unique de la charge utile
    name: string;         // Nom de la charge utile
    type: string;         // Type de la charge utile (par exemple, satellite, cargo)
    customers: string[];  // Liste des clients associés à cette charge utile
}
