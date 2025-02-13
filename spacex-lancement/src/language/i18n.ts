// Importation de la fonction createI18n depuis vue-i18n pour gérer l'internationalisation
import { createI18n } from 'vue-i18n';

// Définition des messages pour chaque langue (ici anglais et français)
const messages = {
    // Langue anglaise
    en: {
        message: {
            info: 'Find all information about our launches',          // Informations sur les lancements
            selectLanguage: 'Choose your language',                   // Choisir la langue
            allLaunches: 'All launches',                               // Tous les lancements
            successfulLaunches: 'Successful',                          // Lancements réussis
            failedLaunches: 'Failed',                                  // Lancements échoués
            missionName: 'Mission Name',                               // Nom de la mission
            launchDate: 'Launch Date',                                 // Date du lancement
            missionDetails: 'Mission Details',                         // Détails de la mission
            articleLink: 'NAVIGATE',                                   // Lien vers l'article
            noArticle: 'No article available',                         // Pas d'article disponible
            showVideo: 'Show Mission Video',                           // Afficher la vidéo de la mission
            launchSite: 'Launch Site',                                 // Site de lancement
            payloads: 'Payloads',                                      // Charges utiles
            customers: 'Customers',                                    // Clients
            closeModal: 'Close',                                       // Fermer la fenêtre modale
            learnMore: 'Learn More',                                   // En savoir plus
            successfulLaunch: 'Successful',                            // Lancement réussi
            failedLaunch: 'Failed Launch',                             // Lancement échoué
            loading: 'Loading...',                                     // Chargement...
            noInfo: 'Information not available',                       // Information non disponible
            nextLaunch: 'Next Launch',                                 // Prochain lancement
            countdown: 'DAYS HOURS MINUTES SECONDS',                   // Compte à rebours
            launchCompleted: 'Launch Completed',                       // Lancement terminé
            footerText: 'By Hamadou BA 👩🏿‍🚀 from planet MARS.',       // Texte du pied de page
        }
    },
    // Langue française
    fr: {
        message: {
            info: 'Retrouvez toutes les informations sur nos lancements',  // Informations sur les lancements
            selectLanguage: 'Choisissez votre langue',                    // Choisir la langue
            allLaunches: 'Tous les lancements',                           // Tous les lancements
            successfulLaunches: 'Lancements réussis',                      // Lancements réussis
            failedLaunches: 'Lancements échoués',                          // Lancements échoués
            missionName: 'Nom de la Mission',                             // Nom de la mission
            launchDate: 'Date de Lancement',                              // Date du lancement
            missionDetails: 'Détail de la Mission',                       // Détails de la mission
            articleLink: 'VISITER',                                       // Lien vers l'article
            noArticle: 'Aucun article disponible',                        // Pas d'article disponible
            showVideo: 'Afficher la vidéo de la mission',                 // Afficher la vidéo de la mission
            launchSite: 'Lieu de lancement',                              // Site de lancement
            payloads: 'Chargements envoyés',                              // Charges utiles
            customers: 'Noms des clients',                                // Clients
            closeModal: 'Fermer',                                         // Fermer la fenêtre modale
            learnMore: 'En savoir plus',                                  // En savoir plus
            successfulLaunch: 'Lancement Réussi',                         // Lancement réussi
            failedLaunch: 'Lancement Échoué',                             // Lancement échoué
            loading: 'Chargement...',                                     // Chargement...
            noInfo: 'Information non disponible',                         // Information non disponible
            nextLaunch: 'Prochain Lancement',                             // Prochain lancement
            countdown: 'JOURS HEURES MINUTES SECONDES',                   // Compte à rebours
            launchCompleted: 'Lancement terminé',                         // Lancement terminé
            footerText: 'Par Hamadou BA 👩🏿‍🚀 depuis la planète MARS.',   // Texte du pied de page
        }
    }
};

// Création de l'instance i18n avec la langue par défaut définie sur 'fr' (français)
// Si la langue spécifiée n'est pas disponible, on utilise la langue 'en' (anglais)
const i18n = createI18n({
    locale: 'fr',             // Langue par défaut
    fallbackLocale: 'en',     // Langue de secours (si la langue choisie n'est pas disponible)
    messages,                // Les messages de traduction pour chaque langue
});

// Exportation de l'instance i18n pour être utilisée dans toute l'application Vue
export default i18n;
