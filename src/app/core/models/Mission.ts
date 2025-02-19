export interface Mission {
    idMission: number;
    nom: string;
    description: string;
    startDate: string; // Date in ISO 8601 format (yyyy-mm-dd)
    finishDate: string; // Date in ISO 8601 format (yyyy-mm-dd)
    etatMission: 'EN_COURS' | 'TERMINEE' | 'EN_ATTENTE'; // Enum corresponding to the Status
    priorite: 'BASSE' | 'MOYENNE' | 'HAUTE'; // Enum corresponding to the Priorité
    budget: number;
    projetId: number; // The id of the associated project (optional if you need it)
    taches: number[]; // List of Task IDs associated with this mission (optional)
    utilisateursIds: number[]; // List of User IDs assigned to the mission
    responsableId: number; // ID of the responsible person for the mission
  }
  