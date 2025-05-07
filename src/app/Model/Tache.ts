export enum Status {
    TODO = 'TODO',
    DOING = 'DOING',
    SUSPENDED = 'SUSPENDED',
    DONE = 'DONE',
  }
  
  export enum Priorite {
    BASSE = 'BASSE',
    MOYENNE = 'MOYENNE',
    HAUTE = 'HAUTE',
  }
  
  export interface Tache {
    idTache?: number; // Optionnel car une tâche n'a pas encore d'ID avant sa création
    nom: string;
    description: string;
    startDate: Date | string; // Peut être Date ou string
    finishDate: Date | string;
    etatTache: Status;
    priorite: Priorite;  // Use the Priorite enum here
    chargeTravail: number;
    responsableId: number;
    assignesIds: number[]; 
    missionId?: number; // Stocke l'ID de la mission associée
  }
  