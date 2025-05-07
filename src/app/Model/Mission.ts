export interface Mission {
    idMission?: number;
    nom: string;
    description: string;
    startDate?: string;
    finishDate?: string;
    etatMission: 'TODO' | 'DOING' | 'SUSPENDED' | 'DONE';
    priorite?: 'BASSE' | 'MOYENNE' | 'HAUTE';
    budget?: number;
    projetId: number;
    taches?: number[];
    utilisateursIds?: number[];
    responsableId?: number;
  }
  