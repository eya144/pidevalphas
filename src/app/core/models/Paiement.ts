// paiement.model.ts
export interface Paiement {
    idPaiement?: number;  // Long idPaiement;
    idUtilisateur?: number;  // Long idUtilisateur;
    idContrat?: number;  // Long idContrat;
    idFacture?: number; // Add idFacture
    montant: number;  // float montant;
    datePaiement: string;  // Date datePaiement; (as string or Date object, depending on usage)
    methodePaiement: 'CARTE' | 'ESPECES' | 'CHÈQUE' | 'VIREMENT'; // methodePaiement (considered as a string type, but you could use an enum if needed)
    numeroCarte: number;  // int numeroCarte;
}
