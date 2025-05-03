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
import { UserListComponent } from './user-list/user-list.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { UserAdminADDComponent } from './user-admin-add/user-admin-add.component';
import { GoogleCallbackComponent } from './google-callback/google-callback.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UserAccountComponent } from './user-account/user-account.component';
import{AuthCallbackComponent} from './auth-callback/auth-callback.component';
import { ListEquipeComponent } from './list-equipe/list-equipe.component';
import { AddEquipeComponent } from './add-equipe/add-equipe.component';
import { EditEquipeComponent } from './edit-equipe/edit-equipe.component';
import { ManageEquipeMembersComponent } from './manage-equipe-members/manage-equipe-members.component';
import { CongesComponent } from './conges/conges.component';
import { AddCongesComponent } from './add-conges/add-conges.component';
import { EditCongesComponent } from './edit-conges/edit-conges.component';
import { DocumentChatComponent } from './document-chat/document-chat.component';
import { ReclamationsComponent } from './reclamations/reclamations.component';
import { AddReclamationComponent } from './add-reclamation/add-reclamation.component';
import { EditReclamationComponent } from './edit-reclamation/edit-reclamation.component';
import { ViewReclamationComponent } from './view-reclamation/view-reclamation.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'produit', component: ProductComponent },
  { path: 'about', component: AboutComponent },
  { path: 'RH', component: RHComponent },
  { path: 'users', component: UserListComponent }, 
  { path: 'logistique', component: LogistiqueComponent },
  { path: 'inspection', component: InspectionComponent },
  { path: 'login', component: LoginComponent },
  { path: 'finance', component: FinanceComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'inscrire', component: InscriptionComponent },
  { path: 'service', component: ServiceComponent },
  { path: 'service', component: ServiceComponent }, 
  { path: 'dashboard_user', component: DashboardUserComponent }, 
   { path: 'dashboard', component: DashboardComponent },
   {path: 'user_admin_add', component: UserAdminADDComponent },
   {path: 'user_admin_update/:id', component: UserAdminADDComponent },
   { path: 'code/google', component: GoogleCallbackComponent },
   { path: 'forgot-password', component: ForgotPasswordComponent },
   { path: 'auth/callback', component: AuthCallbackComponent },
   {path:'account',component:UserAccountComponent},
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
  { path: 'reclamations', component: ReclamationsComponent },
  { path: 'add-reclamation', component: AddReclamationComponent },
  { path: 'edit-reclamation/:id', component: EditReclamationComponent },
  { path: 'view-reclamation/:id', component: ViewReclamationComponent },
   
  
  

  { path: '', redirectTo:'/home',pathMatch:'full' }
];

 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
