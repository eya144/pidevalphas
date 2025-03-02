export interface RapportFinancier {
    idRapport: number; 
    idUtilisateur: number; 
    dépense: number; 
    salaire: number; 
    statut: 'RENTABLE' | 'DEFICIT' ;
  }