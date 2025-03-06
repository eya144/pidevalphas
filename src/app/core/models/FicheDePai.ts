export interface BulletinPaie {
  idBulletinPaie: number;
  idContrat?: number;
  idUtilisateur?: number;
  montantInitial: number;
  nom: string;
  joursNonTravailles: number;
  typePaiement: 'ESPECES' | 'CHÈQUE' | 'VIREMENT' | 'CARTE'; 
  datePaiement: Date;
  statutPaiementL: 'Paid' | 'Unpaid'; 
  montantFinal?: number;
}