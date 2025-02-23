export interface Facture {
  montant: any;
  idFacture?: number;
  idCommande?: number;
  idResponsableLogistique?: number;
  idFournisseur?: number;
  idUtilisateur?: number;
  montantTotal: number;
  dateFacture: string; // ou Date si vous utilisez des objets Date
  dateEcheance: string; // ou Date si vous utilisez des objets Date
  montantTotalHorsTaxe: number;
  tva: number;
  status: 'Paid' | 'Unpaid'; // Ajout du statut
}