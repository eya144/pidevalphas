export interface Facture {
    idFacture: number;
    idCommande: number;
    idResponsableLogistique: number;
    idFournisseur: number;
    idUtilisateur: number;
    montantTotal: number;
    dateFacture: string;
    dateEcheance: string;
    montantTotalHorsTaxe: number;  
    tva: number;                   
  }