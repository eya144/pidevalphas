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
import { AddMaterielComponent } from './add-materiel/add-materiel.component';
import { EditMaterielComponent } from './edit-materiel/edit-materiel.component';
import { CommandeComponent } from './commande/commande.component';
import { DashboardLogistiqueComponent } from './dashboard-logistique/dashboard-logistique.component';
import { CommandeDashComponent } from './commande-dash/commande-dash.component';
import { StocksComponent } from './stocks/stocks.component';

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
  {
    path: 'dashboardLogistique',
    component: DashboardLogistiqueComponent,
    children: [
      { path: 'overview', component: StocksComponent }, // Vue d'ensemble des stocks
      { path: 'orders', component: CommandeDashComponent }, // Suivi des commandes fournisseurs
     
    ],
  },

  { path: '', redirectTo:'/home',pathMatch:'full' }
];

 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
