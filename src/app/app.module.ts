import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
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
import { FichedepaieComptableComponent } from './fichedepaie-comptable/fichedepaie-comptable.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { AdminBackComponent } from './admin-back/admin-back.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { PaiementComponent } from './paiement/paiement.component';
import { AddFichedepaieComponent } from './add-fichedepaie/add-fichedepaie.component';
import { NgChartsModule } from 'ng2-charts';
import { PaiementSuccessComponentComponent } from './paiement-success-component/paiement-success-component.component';
import { PaiementCancelComponentComponent } from './paiement-cancel-component/paiement-cancel-component.component';
import { StripeService } from './stripe.service';
import { jsPDF } from 'jspdf';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { SignaturePadComponent } from './signature-pad/signature-pad.component';
import { RapportFinancierComponentComponent } from './rapport-financier-component/rapport-financier-component.component';
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
import { AddVehiculeComponent } from './rahma/module1Materiel/add-vehicule/add-vehicule.component';
import { EditVehiculeComponent } from './rahma/module1Materiel/edit-vehicule/edit-vehicule.component';
import { AffectVehiculeComponent } from './rahma/module1Materiel/affect-vehicule/affect-vehicule.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TopMaterielComponent } from './rahma/statistique/top-materiel/top-materiel.component';
import { PlaningComponent } from './rahma/module2Entretien/planing/planing.component';
import { ChauffeurInterfaceComponent } from './rahma/module1Materiel/chauffeur-interface/chauffeur-interface.component';
import { VehiculeDispoComponent } from './rahma/module1Materiel/vehicule-dispo/vehicule-dispo.component';


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
      FichedepaieComptableComponent,
      AppHeaderComponent,
      AppFooterComponent,
      AdminBackComponent,
      SearchResultsComponent,
      PaiementComponent,
      AddFichedepaieComponent,
      PaiementSuccessComponentComponent,
      PaiementCancelComponentComponent,
      SignaturePadComponent,
      RapportFinancierComponentComponent,
    
    ],
  imports: [
    BrowserModule,
    AppRoutingModule ,
    ReactiveFormsModule ,
    HttpClientModule ,
    BrowserAnimationsModule ,
    FormsModule,
    NgChartsModule,
    ZXingScannerModule,
    
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
      ListeDemandeDashComponent,
      AddVehiculeComponent,
      EditVehiculeComponent,
      AffectVehiculeComponent,
      TopMaterielComponent,
      PlaningComponent,
      ChauffeurInterfaceComponent,
      VehiculeDispoComponent,
      
      
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule  ,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatFormFieldModule,
    BrowserModule,
   
  ],
  providers: [
     { provide: 'STRIPE_PUBLISHABLE_KEY', useValue: 'pk_test_51Qy2JjKpCQHkABgKARu62V68rkleu9aMJPS5sPQhG0i7llQ52C9wsHm5sPtwyg0C7sice93CFKXKVCqAAJhMX03X00oOdAFYjL' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
