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


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
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
  { path: '', component: BackHeaderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
