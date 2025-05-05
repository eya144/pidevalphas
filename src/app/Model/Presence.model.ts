
import { User } from '../Model/User.model';

export interface Presence {
  idP?: number;                
  dateP: Date;                
  heureentre: string;         
  heuresortie: string;        
  user: User;                 
}
