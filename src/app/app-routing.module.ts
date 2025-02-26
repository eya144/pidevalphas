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
import { AddFinanceComponent } from './add-finance/add-finance.component';
import { EditFinanceComponent } from './edit-finance/edit-finance.component';
import { PaiementComponent } from './paiement/paiement.component';
import { AddPaiementComponent } from './add-paiement/add-paiement.component';
import { FichedepaieComptableComponent } from './fichedepaie-comptable/fichedepaie-comptable.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppFooterComponent } from './app-footer/app-footer.component';

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
   { path: 'add-finance', component:AddFinanceComponent },
   { path: 'edit-finance/:id', component: EditFinanceComponent }, // Nouvelle route pour l'édition
   { path: 'paiement', component: PaiementComponent },
   { path: 'add-paiement', component:AddPaiementComponent },
   { path: 'fichedepaie-comptable', component:FichedepaieComptableComponent },
   { path: '', redirectTo:'/home',pathMatch:'full' }
];

 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
