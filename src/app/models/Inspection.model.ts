export enum StatusInspection {
  In_Progress = 'In_Progress',
  Completed = 'Completed',
  Canceled = 'Canceled',
  Planned = "Planned"
}

export enum TypeInspection {
  Structural = 'Structural',
  Security = 'Security',
  Installation = 'Installation',
  Finishing = 'Finishing'
}

export enum CauseNonComform {
  Protocoles_de_sécurité = 'Protocoles de sécurité',
  Équipements_défectueux = 'Équipements défectueux',
  Protection_individuelle = 'Protection_individuelle',
  Non_conformité_réglementaire = 'Non conformité réglementaire',
  Autres = 'Autres',
  Désordres_apparents = 'Désordres apparents',
  Malfaçons_structurelles = 'Malfaçons structurelles',
  Vices_cachés = 'Vices cachés',
  Isolation_et_ventilation = 'Isolation et ventilation',
  Peintures_et_revêtements = 'Peintures et revêtements',
  Installation_et_pose_des_solins = 'Installation et pose des solins',
  Installation_déficiente_de_plomberie = 'Installation déficiente de plomberie',
  Séparation_coupe_feu = 'Séparation coupe-feu',
  Installation_et_pose_du_revêtement_extérieur = 'Installation et pose du revêtement extérieur',
  Continuité_et_intégrité_du_mur_coupe_feu = 'Continuité et intégrité du mur coupe feu'
}



export interface NonConformity {
  idNC: number;
  description: string; 
  typeNonConfirm: TypeNonConformity; 
  dateDetection: string; 
  statutNonConfirm: StatutNonConfirmity ; 
  actionCorrective?: ActionCorrective[];
  
}

export interface Projet {
  idProjet: number;
  nomProjet: string; 
}

export interface Inspection {

  idProjet: any;
  idINS: number;
  dateInspection: string; 
  typeInspection: TypeInspection;
  statusInspection: StatusInspection;
  nonConformities:[]
  rapportQualite?: RapportQualite; 
  projet:Projet | null | undefined;
  user: User | null | undefined;
}




export enum StatutNonConfirmity {
  Not_Corrected = "Not_Corrected",
  Corrected = "Corrected",
  Pending = "Pending"


}
export enum TypeNonConformity {
  Protocoles_de_safety = 'Protocoles_de_safety',
  Defective_equipment = 'Defective_equipment',
  Individual_protection = 'Individual_protection',
  Regulatory_non_compliance = 'Regulatory_non_compliance',
  Others = 'Others',
  Apparent_disorders = 'Apparent_disorders',
  Structural_defects = 'Structural_defects',
  Hidden_defects = 'Hidden_defects',
  Insulation_and_ventilation = 'Insulation_and_ventilation',
  Installation_and_flashing_placement = 'Installation_and_flashing_placement',

  Deficient_plumbing_installation = 'Deficient_plumbing_installation',
  Fire_partition = 'Fire_partition',
  Installation_and_placement_of_exterior_cladding = 'Installation_and_placement_of_exterior_cladding',
  Continuity_and_integrity_of_firewall = 'Continuity_and_integrity_of_firewall'
}


export interface ActionCorrective {
  idAC: number; // Identifiant unique de l'action corrective
  description: string; // Description de l'action corrective
  dateDebut: string; // Date de début de l'action corrective
  dateFin: string; // Date de fin de l'action corrective
  statusActionCorrective: StatusInspection; // Statut de l'action corrective (Enum)
}


export interface CahierDeCharge {
  id?: number; // Facultatif, car il est généré automatiquement
  titre: string;
  description: string;
  pdfData?: string | ArrayBuffer | null; // Stockage du fichier sous forme de base64 ou buffer
  user?: User; // Relation avec l'utilisateur
}

export interface User {
  idUSER: number;
  nom: string;
  adresse: string;
  telephone: string;
  email: string;
  userRole: UserRole;
}

export enum UserRole {
  ARCHITECTE = 'ARCHITECTE',
  INGENIEUR = 'INGENIEUR',
  CLIENT = 'CLIENT',
  INSPECTEUR = 'Inspecteur'
}


export interface RapportQualite {
  typeInspection: any;
  statusInspection: any;
  nonConformities: boolean;
  date: string;
  statut: any;
  nonConformites: string;
  actionsCorrectives: string;
  idR: number;
  contenu: string;
  photoVideo?: string;
  dateCreation: string;
  inspectionId: number;
}

