export interface RapportFinancier {
    idRapport: number; 
    idUtilisateur: number; 
    depense: number; 
    budget: number;
    salaire: number; 
    status: 'RENTABLE' | 'DEFICIT' ;
  }