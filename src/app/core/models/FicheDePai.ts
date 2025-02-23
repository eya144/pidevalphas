export interface BulletinPaie {
  idBulletinPaie: number;
  idRapport: number;
  idContrat: number;
  idUtilisateur: number;
  montantInitial: number;
  nom: string;
  joursTravailles: number;
  typePaiement: 'ESPECES' | 'CHEQUE' | 'VIREMENT_BANCAIRE';
  datePaiement: Date;
  statutPaiementL: 'Paid' | 'Unpaid'; 
  montantFinal?: number;
}