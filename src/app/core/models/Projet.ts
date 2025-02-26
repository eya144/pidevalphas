import { Mission } from "./Mission";

export interface Projet {
  idProjet: number;                  // Identifiant unique du projet
  nom: string;                       // Nom du projet
  description: string;               // Description détaillée du projet
  typeProjet: string;                // Type de projet (par exemple, construction, rénovation, etc.)
  status: string;                    // Statut du projet (en cours, terminé, suspendu, etc.)
  dateDebut: string;                 // Date de début du projet (format : 'yyyy-MM-dd')
  dateFinPrevue: string;             // Date de fin prévue du projet (format : 'yyyy-MM-dd')
  dateFinReelle: string;             // Date de fin réelle du projet (format : 'yyyy-MM-dd'), peut être vide
  budgetInitial: number;             // Budget initial alloué au projet
  budgetReel: number;                // Budget réel dépensé jusqu'à présent
  adresse: string;                   // Adresse du projet (lieu de réalisation)
  latitude: number;                  // Latitude géographique du projet (en degrés)
  longitude: number;                 // Longitude géographique du projet (en degrés)
  maitreOuvrage: string;             // Nom du maître d'ouvrage (propriétaire du projet)
  maitreOeuvre: string;              // Nom du maître d'œuvre (superviseur du projet)
  entrepreneurPrincipal: string;     // Nom de l'entrepreneur principal
  chefProjetId: number;              // ID du chef de projet (référence à un utilisateur dans la base de données)
  nomChefProjet?: string;  // Ajoute cette ligne
  permisConstruction: boolean;       // Si le permis de construire a été obtenu
  progression: number;               // Pourcentage de progression du projet (0 à 100)
  risquesIdentifies: string;         // Risques identifiés pour le projet
  contraintes: string;
  missions: Mission[];               // Contraintes et défis associés au projet
}
