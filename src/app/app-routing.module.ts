import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { RHComponent } from './rh/rh.component';
import { LogistiqueComponent } from './rahma/module1Materiel/logistique/logistique.component';
import { InspectionComponent } from './inspection/inspection.component';
import { FinanceComponent } from './finance/finance.component';
import { ContactComponent } from './contact/contact.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ServiceComponent } from './service/service.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddFinanceComponent } from './add-finance/add-finance.component';
import { EditFinanceComponent } from './edit-finance/edit-finance.component';
import { FichedepaieComptableComponent } from './fichedepaie-comptable/fichedepaie-comptable.component';
import { BackHeaderComponent } from './back-header/back-header.component';
import { BackMenuAdminComponent } from './back-menu-admin/back-menu-admin.component';
import { AdminBackComponent } from './admin-back/admin-back.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { PaiementComponent } from './paiement/paiement.component';
import { AddFichedepaieComponent } from './add-fichedepaie/add-fichedepaie.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { PaiementSuccessComponentComponent } from './paiement-success-component/paiement-success-component.component';
import { PaiementCancelComponentComponent } from './paiement-cancel-component/paiement-cancel-component.component';
import { jsPDF } from 'jspdf';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { SignaturePadComponent } from './signature-pad/signature-pad.component';
import { RapportFinancierComponentComponent } from './rapport-financier-component/rapport-financier-component.component';
import { AddMaterielComponent } from './rahma/module1Materiel/add-materiel/add-materiel.component';
import { EditMaterielComponent } from './rahma/module1Materiel/edit-materiel/edit-materiel.component';
import { CommandeComponent } from './rahma/module1Commande/commande/commande.component';
import { DashboardLogistiqueComponent } from './rahma/dashboard-logistique/dashboard-logistique.component';
import { CommandeDashComponent } from './rahma/module1Commande/commande-dash/commande-dash.component';
import { StocksComponent } from './stocks/stocks.component';
import { CommandeFournisseurComponent } from './rahma/module1Commande/commande-fournisseur/commande-fournisseur.component';
import { DemandeEmploiComponent } from './rahma/module2Entretien/demande-emploi/demande-emploi.component';
import { DetailsDemandeEmploiComponent } from './rahma/module2Entretien/details-demande-emploi/details-demande-emploi.component';
import { EntretienComponent } from './rahma/module2Entretien/entretien/entretien.component';
import { OrganisationEntretienComponent } from './rahma/module2Entretien/organisation-entretien/organisation-entretien.component';
import { DemandeMaterielComponent } from './rahma/module1Demande/demande-materiel/demande-materiel.component';
import { ListDemandeComponent } from './rahma/module1Demande/list-demande/list-demande.component';
import { ListeDemandeByUserComponent } from './rahma/module1Demande/liste-demande-by-user/liste-demande-by-user.component';
import { ListeDemandeDashComponent } from './rahma/module1Demande/liste-demande-dash/liste-demande-dash.component';
import { AddVehiculeComponent } from './rahma/module1Materiel/add-vehicule/add-vehicule.component';
import { EditVehiculeComponent } from './rahma/module1Materiel/edit-vehicule/edit-vehicule.component';
import { AffectVehiculeComponent } from './rahma/module1Materiel/affect-vehicule/affect-vehicule.component';
import { TopMaterielComponent } from './rahma/statistique/top-materiel/top-materiel.component';
import { PlaningComponent } from './rahma/module2Entretien/planing/planing.component';
import { ChauffeurInterfaceComponent } from './rahma/module1Materiel/chauffeur-interface/chauffeur-interface.component';
import { VehiculeDispoComponent } from './rahma/module1Materiel/vehicule-dispo/vehicule-dispo.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { GoogleCallbackComponent } from './google-callback/google-callback.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { UserAdminADDComponent } from './user-admin-add/user-admin-add.component';
import { UserListComponent } from './user-list/user-list.component';
import { AddCongesComponent } from './add-conges/add-conges.component';
import { AddEquipeComponent } from './add-equipe/add-equipe.component';
import { AddReclamationComponent } from './add-reclamation/add-reclamation.component';
import { CongesComponent } from './conges/conges.component';
import { EditCongesComponent } from './edit-conges/edit-conges.component';
import { EditEquipeComponent } from './edit-equipe/edit-equipe.component';
import { EditReclamationComponent } from './edit-reclamation/edit-reclamation.component';
import { ListEquipeComponent } from './list-equipe/list-equipe.component';
import { ManageEquipeMembersComponent } from './manage-equipe-members/manage-equipe-members.component';
import { ReclamationsComponent } from './reclamations/reclamations.component';
import { ViewReclamationComponent } from './view-reclamation/view-reclamation.component';
import { DocumentChatComponent } from './document-chat/document-chat.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'produit', component: ProductComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'RH', component: RHComponent },
  { path: 'logistique', component: LogistiqueComponent },
  { path: 'inspection', component: InspectionComponent },
  { path: 'finance', component: FinanceComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'inscrire', component: InscriptionComponent },
  { path: 'service', component: ServiceComponent },
  { path: 'dashboard', component: DashboardComponent },
  //Zayneb
  { path: 'app-app-header', component: AppHeaderComponent },
  { path: 'add-finance', component: AddFinanceComponent },
  { path: 'edit-finance/:id', component: EditFinanceComponent }, 
  { path: 'fichedepaie-comptable', component: FichedepaieComptableComponent },
  { path: 'back-header', component: BackHeaderComponent },
  { path: 'back-menu-admin', component: BackMenuAdminComponent },
  { path: 'admin-back', component: AdminBackComponent },
  { path: 'search', component: SearchResultsComponent },
  { path: 'paiement/:id', component: PaiementComponent },
  { path: 'add-fichedepaie', component: AddFichedepaieComponent },
  { path: 'success', component: PaiementSuccessComponentComponent},
  { path: 'cancel', component: PaiementCancelComponentComponent },
  { path: 'signature-pad', component: SignaturePadComponent },
  { path: 'rapport', component: RapportFinancierComponentComponent },
  { path: 'service', component: ServiceComponent }, 
  { path: 'dashboard', component: DashboardComponent },
  //dawser
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'dashboard_user', component: DashboardUserComponent }, 
  {path: 'user_admin_add', component: UserAdminADDComponent },
  { path: 'users', component: UserListComponent }, 
   {path: 'user_admin_update/:id', component: UserAdminADDComponent },
   { path: 'code/google', component: GoogleCallbackComponent },
   {path:'account',component:UserAccountComponent},
 
   
   { path: 'auth/callback', component: AuthCallbackComponent },
   { path: 'service', component: ServiceComponent },
 //spool
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
  //RAHMA
  { path: 'addMateriel', component: AddMaterielComponent },
  { path: 'editMateriel/:id', component: EditMaterielComponent }, 
  { path: 'commande/:idCommande', component: CommandeComponent },
  {path: 'dashboardLogistique',
    component: DashboardLogistiqueComponent,
    children: [
      { path: 'logistique', component: LogistiqueComponent }, // Vue d'ensemble des stocks
      { path: 'orders', component: CommandeDashComponent }, 
      { path: 'listDemandeDash', component: ListeDemandeDashComponent },
      { path: 'affectVehicule', component: AffectVehiculeComponent },
      { path: 'statistique', component: TopMaterielComponent },  
      { path: 'vehiculeDispo', component: VehiculeDispoComponent },  
      
    ],
  },
  { path: 'commandeFournisseur', component: CommandeFournisseurComponent },
  { path: 'chauffeurInterface', component: ChauffeurInterfaceComponent },  
  { path: 'vehiculeDispo', component: VehiculeDispoComponent },  
  { path: 'demandeEmploi', component: DemandeEmploiComponent },
  { path: 'demandeEmploi/details/:id', component: DetailsDemandeEmploiComponent },
  { path: 'addVehicule', component: AddVehiculeComponent },
  { path: 'editVehicule/:id', component: EditVehiculeComponent },
  { path: 'demandeMateriel', component: DemandeMaterielComponent },

  { path: 'demandesEmploi', component : EntretienComponent },
  { path: 'entretientOrg/:id', component: OrganisationEntretienComponent },
  { path: 'listDemande', component: ListeDemandeDashComponent },
  { path: 'planning', component: PlaningComponent },  

  //RAHMA

  { path: '', redirectTo:'/home',pathMatch:'full' }

  //dawser
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
