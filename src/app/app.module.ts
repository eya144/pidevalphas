import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { LogistiqueComponent } from './rahma/module1Materiel/logistique/logistique.component';
import { RHComponent } from './rh/rh.component';
import { FinanceComponent } from './finance/finance.component';
import { InspectionComponent } from './inspection/inspection.component';

import { ContactComponent } from './contact/contact.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ServiceComponent } from './service/service.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BackMenuAdminComponent } from './back-menu-admin/back-menu-admin.component';
import { BackHeaderComponent } from './back-header/back-header.component';
import { HttpClientModule } from '@angular/common/http';
import { HeadeerComponent } from './headeer/headeer.component';
import { AddMaterielComponent } from './rahma/module1Materiel/add-materiel/add-materiel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditMaterielComponent } from './rahma/module1Materiel/edit-materiel/edit-materiel.component';
import { CommandeComponent } from './rahma/module1Commande/commande/commande.component';
import { DashboardLogistiqueComponent } from './rahma/dashboard-logistique/dashboard-logistique.component';
import { CommandeDashComponent } from './rahma/module1Commande/commande-dash/commande-dash.component';
import { StocksComponent } from './stocks/stocks.component';
import { CommandeFournisseurComponent } from './rahma/module1Commande/commande-fournisseur/commande-fournisseur.component';
import { DemandeEmploiComponent } from './rahma/module2Entretien/demande-emploi/demande-emploi.component';
import { FooterHomeComponent } from './footer-home/footer-home.component';
import { DetailsDemandeEmploiComponent } from './rahma/module2Entretien/details-demande-emploi/details-demande-emploi.component';
import { EntretienComponent } from './rahma/module2Entretien/entretien/entretien.component';
import { OrganisationEntretienComponent } from './rahma/module2Entretien/organisation-entretien/organisation-entretien.component';
import { DemandeMaterielComponent } from './rahma/module1Demande/demande-materiel/demande-materiel.component';
import { DetailDemandeComponent } from './rahma/module1Demande/detail-demande/detail-demande.component';
import { ListDemandeComponent } from './rahma/module1Demande/list-demande/list-demande.component';
import { ListeDemandeByUserComponent } from './rahma/module1Demande/liste-demande-by-user/liste-demande-by-user.component';
import { ListeDemandeDashComponent } from './rahma/module1Demande/liste-demande-dash/liste-demande-dash.component';

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
      HeadeerComponent,
      AddMaterielComponent,
      EditMaterielComponent,
      CommandeComponent,
      DashboardLogistiqueComponent,
      CommandeDashComponent,
      StocksComponent,
      CommandeFournisseurComponent,
      DemandeEmploiComponent,
      FooterHomeComponent,
      DetailsDemandeEmploiComponent,
      EntretienComponent,
      OrganisationEntretienComponent,
      DemandeMaterielComponent,
      DetailDemandeComponent,
      ListDemandeComponent,
      ListeDemandeByUserComponent,
      ListeDemandeDashComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule  ,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
