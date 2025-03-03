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
import { DetailDemandeComponent } from './rahma/module1Demande/detail-demande/detail-demande.component';
import { ListDemandeComponent } from './rahma/module1Demande/list-demande/list-demande.component';
import { ListeDemandeByUserComponent } from './rahma/module1Demande/liste-demande-by-user/liste-demande-by-user.component';
import { ListeDemandeDashComponent } from './rahma/module1Demande/liste-demande-dash/liste-demande-dash.component';
import { AddVehiculeComponent } from './rahma/module1Materiel/add-vehicule/add-vehicule.component';
import { EditVehiculeComponent } from './rahma/module1Materiel/edit-vehicule/edit-vehicule.component';
import { AffectVehiculeComponent } from './rahma/module1Materiel/affect-vehicule/affect-vehicule.component';
import { TopMaterielComponent } from './rahma/statistique/top-materiel/top-materiel.component';
import { PlaningComponent } from './rahma/module2Entretien/planing/planing.component';

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
  { path: 'addMateriel', component: AddMaterielComponent },
  { path: 'editMateriel/:id', component: EditMaterielComponent }, 
  { path: 'commande/:idCommande', component: CommandeComponent },
  {path: 'dashboardLogistique',
    component: DashboardLogistiqueComponent,
    children: [
      { path: 'overview', component: StocksComponent }, // Vue d'ensemble des stocks
      { path: 'orders', component: CommandeDashComponent }, 
      { path: 'listDemandeDash', component: ListeDemandeDashComponent },
      { path: 'affectVehicule', component: AffectVehiculeComponent },
      { path: 'statistique', component: TopMaterielComponent },  
    ],
  },
  { path: 'commandeFournisseur', component: CommandeFournisseurComponent },
  { path: 'demandeEmploi', component: DemandeEmploiComponent },
  { path: 'demandeEmploi/details/:id', component: DetailsDemandeEmploiComponent },
  { path: 'demandesEmploi', component : EntretienComponent },
  { path: 'entretientOrg/:id', component: OrganisationEntretienComponent },
  { path: 'demandeMateriel', component: DemandeMaterielComponent },
  { path: 'detailDemande/:id', component: DetailDemandeComponent },
  { path: 'listDemande', component: ListeDemandeDashComponent },
  { path: 'listDemandeByUser', component: ListeDemandeByUserComponent },
  { path: 'addVehicule', component: AddVehiculeComponent },
  { path: 'editVehicule/:id', component: EditVehiculeComponent },
  { path: 'planning', component: PlaningComponent },  
  

  { path: '', redirectTo:'/home',pathMatch:'full' }
];

 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
