// src/app/Model/User.model.ts
import { Presence } from '../Model/Presence.model'; 

export enum Role {
    ADMIN = 'ROLE_ADMIN',
    USER = 'ROLE_USER',
    GUEST = 'ROLE_GUEST',
    RESPONSABLELOG = 'ROLE_RESPONSABLELOG',
    INSPECTER = 'ROLE_INSPECTER',
    RH = 'ROLE_RH',
    PROJECTMANAGER = 'ROLE_PROJECTMANAGER',
    EMPLOYE = 'ROLE_EMPLOYE',
    
}

export interface User {
    idU?: number;
    nomU: string;
    prenomU: string;
    emailU: string;
    motdepasseU: string;
    salaireU: number;
    role?: Role;
    presences?: Presence[]; 
    etude?: string;
    passion?: string;
    experience?: string;
    competences?: string;
    
}