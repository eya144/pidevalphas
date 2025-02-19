// src/app/core/models/Projet.ts

export interface Projet {
    idProjet: number;
    nom: string;
    description: string;
    typeProjet: string; // On suppose que c'est une chaîne de caractères. Tu peux définir un enum si nécessaire
    status: string; // Même chose ici, tu peux créer un enum pour les statuts
    dateDebut: string; // Date sous forme de string (par exemple, 'YYYY-MM-DD')
    dateFinPrevue: string;
    dateFinReelle: string;
    budgetInitial: number;
    budgetReel: number;
    adresse: string;
    latitude: number;
    longitude: number;
    maitreOuvrage: string;
    maitreOeuvre: string;
    entrepreneurPrincipal: string;
    chefProjetId: number;
    permisConstruction: boolean;
    progression: number;
    risquesIdentifies: string;
    contraintes: string;
    missions: any[]; // Liste des missions, tu peux créer une interface pour Mission si tu veux
    membresEquipeIds: number[]; // Liste des IDs des membres de l'équipe
  }
  