export interface Commande {
    idCommande: number;
    idResponsableLogistique?: number;
    nomCommande: string;
    quantite: number;
    idFacture?: number;
    
  }