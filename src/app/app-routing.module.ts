import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
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
import { ListEquipeComponent } from './equipe/list-equipe/list-equipe.component';
import { AddEquipeComponent } from './equipe/add-equipe/add-equipe.component';
import { EditEquipeComponent } from './equipe/edit-equipe/edit-equipe.component';
import { ManageEquipeMembersComponent } from './equipe/manage-equipe-members/manage-equipe-members.component';
import { CongesComponent } from './conges/conges.component';
import { AddCongesComponent } from './add-conges/add-conges.component';
import { EditCongesComponent } from './edit-conges/edit-conges.component';
import { DocumentChatComponent } from './document-chat/document-chat.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'produit', component: ProductComponent },
  { path: 'about', component: AboutComponent },
  { path: 'RH', component: RHComponent },
  { path: 'logistique', component: LogistiqueComponent },
  { path: 'inspection', component: InspectionComponent },
  { path: 'login', component: LoginComponent },
  { path: 'finance', component: FinanceComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'inscrire', component: InscriptionComponent },
  { path: 'service', component: ServiceComponent },
  { path: 'service', component: ServiceComponent },
   { path: 'dashboard', component: DashboardComponent },

  // { path : 'equipe',
  //   loadChildren: () => import('./equipe/equipe.routes').then(m => m.routes),
  // },

  {
    path: 'teams',
    component: ListEquipeComponent
  },
  {
    path: 'add-team',
    component: AddEquipeComponent
  },
  {
    path: 'edit-team/:id',
    component: EditEquipeComponent
  },
  {
    path: 'manage-members/:id',
    component: ManageEquipeMembersComponent
  },
  { path: 'conges',
    component: CongesComponent
  },
  {
    path: 'add-conges',
    component: AddCongesComponent,
  },
  {
    path: 'edit-conges/:id',
    component: EditCongesComponent,
  },
  {
    path: 'document-chat',
    component: DocumentChatComponent,
  },
  { path: '', redirectTo:'/home',pathMatch:'full' }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
