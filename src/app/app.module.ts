import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { LogistiqueComponent } from './logistique/logistique.component';
import { RHComponent } from './rh/rh.component';
import { FinanceComponent } from './finance/finance.component';
import { InspectionComponent } from './inspection/inspection.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 

import { ContactComponent } from './contact/contact.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ServiceComponent } from './service/service.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BackMenuAdminComponent } from './back-menu-admin/back-menu-admin.component';
import { BackHeaderComponent } from './back-header/back-header.component';
import { AddFinanceComponent } from './add-finance/add-finance.component';
import { EditFinanceComponent } from './edit-finance/edit-finance.component';
import { PaiementComponent } from './paiement/paiement.component';
import { AddPaiementComponent } from './add-paiement/add-paiement.component';
import { EditPaiementComponent } from './edit-paiement/edit-paiement.component';
import { CommandeComptableComponent } from './commande-comptable/commande-comptable.component';
import { FichedepaieComptableComponent } from './fichedepaie-comptable/fichedepaie-comptable.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    AboutComponent,
    LoginComponent,
    LogistiqueComponent,
    RHComponent,
    FinanceComponent,
    InspectionComponent,
    ContactComponent,
      InscriptionComponent,
      ServiceComponent,
      DashboardComponent,
      BackMenuAdminComponent,
      BackHeaderComponent,
      AddFinanceComponent,
      EditFinanceComponent,
      PaiementComponent,
      AddPaiementComponent,
      EditPaiementComponent,
      CommandeComptableComponent,
      FichedepaieComptableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule ,
    ReactiveFormsModule ,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
