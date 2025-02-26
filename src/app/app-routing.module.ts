import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { RHComponent } from './rh/rh.component';
import { LogistiqueComponent } from './logistique/logistique.component';
import { InspectionComponent } from './inspection/inspection.component';
import { FinanceComponent } from './finance/finance.component';
import { ContactComponent } from './contact/contact.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ServiceComponent } from './service/service.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjetComponent } from './projet/projet.component';
import { AddProjetComponent } from './add-projet/add-projet.component';
import { EditProjetComponent } from './edit-projet/edit-projet.component';
import { MissionComponent } from './mission/mission.component';
import { DetailsProjetComponent } from './details-projet/details-projet.component';
import { AddMissionComponent } from './add-mission/add-mission.component';
import { MissionDetailsComponent } from './mission-details/mission-details.component';
import { UpdateMissionComponent } from './update-mission/update-mission.component';
import { TaskComponent } from './task/task.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'RH', component: RHComponent },
  { path: 'logistique', component: LogistiqueComponent },
  { path: 'inspection', component: InspectionComponent },
  { path: 'login', component: LoginComponent },
  { path: 'finance', component: FinanceComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'inscrire', component: InscriptionComponent },
  { path: 'service', component: ServiceComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'projet', component: ProjetComponent },
  { path: 'add-projet', component: AddProjetComponent },
  { path: 'edit-projet/:id', component: EditProjetComponent },
  { path: 'details-projet/:id', component: DetailsProjetComponent },
  { path: 'add-mission/:id', component: AddMissionComponent },  // L'ID du projet
  { path: 'projets/:id/missions', component: MissionComponent },
  { path: 'mission-details/:id', component: MissionDetailsComponent },
  // Route d'update : on passe l'ID de la mission et l'ID du projet
  { path: 'update-mission/:idMission/:id', component: UpdateMissionComponent },
  { path: 'tasks/:missionId', component: TaskComponent }, // Afficher la liste des tâches

  { path: '', redirectTo: '/home', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
