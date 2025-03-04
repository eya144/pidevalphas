export enum  Status {
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
    startDate: Date;
    finishDate: Date;
    etatTache: Status;
    priorite: 'BASSE' | 'MOYENNE' | 'HAUTE';
    chargeTravail: number;
    responsableId: number;
    assignesIds: number[];
    missionId?: number; // Stocke l'ID de la mission associée
  }