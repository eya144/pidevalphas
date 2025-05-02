export interface Materiel {
    idMateriel: number;
    categorie: string;
    quantite: number;
    nomMateriel: string;
    prixMateriel: number;
  }
  
  export interface LigneDemande {
    idLigneDemande: number;
    quantite: number;
    materiel: Materiel;
    isEditing?: boolean;
  }
  
  export interface Demande {
    idDemande: number;
    status: string;
    dateDemande: string;
    ligneDemandes: LigneDemande[];
  }
  