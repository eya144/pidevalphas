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
import { FichedepaieComptableComponent } from './fichedepaie-comptable/fichedepaie-comptable.component';
//import { BackFinanceComponent } from './back-finance/back-finance.component';
import { BackHeaderComponent } from './back-header/back-header.component';
import { BackMenuAdminComponent } from './back-menu-admin/back-menu-admin.component';
import { AddPaiementComponent } from './add-paiement/add-paiement.component';
import { AdminBackComponent } from './admin-back/admin-back.component';
// import { FicheComponent } from './fiche/fiche.component';
import { SearchResultsComponent } from './search-results/search-results.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirection par défaut
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
  { path: 'add-finance', component: AddFinanceComponent },
  { path: 'edit-finance/:id', component: EditFinanceComponent }, // Route avec paramètre
  { path: 'add-paiement/:idFacture', component: AddPaiementComponent }, // 🔥 ID Facture passé dynamiquement
  { path: 'fichedepaie-comptable', component: FichedepaieComptableComponent },
  { path: 'back-header', component: BackHeaderComponent },
  { path: 'back-menu-admin', component: BackMenuAdminComponent },
  { path: 'admin-back', component: AdminBackComponent },
  { path: 'search', component: SearchResultsComponent },
  { path: '', component: BackHeaderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
