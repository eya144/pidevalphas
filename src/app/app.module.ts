import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card'; // Ajoute cette ligne
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
import { AddFinanceComponent } from './add-finance/add-finance.component';
import { EditFinanceComponent } from './edit-finance/edit-finance.component';
import { FichedepaieComptableComponent } from './fichedepaie-comptable/fichedepaie-comptable.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { AdminBackComponent } from './admin-back/admin-back.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { PaiementComponent } from './paiement/paiement.component';
import { AddFichedepaieComponent } from './add-fichedepaie/add-fichedepaie.component';
import { PaiementSuccessComponentComponent } from './paiement-success-component/paiement-success-component.component';
import { PaiementCancelComponentComponent } from './paiement-cancel-component/paiement-cancel-component.component';
import { SignaturePadComponent } from './signature-pad/signature-pad.component';
import { RapportFinancierComponentComponent } from './rapport-financier-component/rapport-financier-component.component';
import { HeadeerComponent } from './headeer/headeer.component';
import { AddMaterielComponent } from './rahma/module1Materiel/add-materiel/add-materiel.component';
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
import { TopMaterielComponent } from './rahma/statistique/top-materiel/top-materiel.component';
import { PlaningComponent } from './rahma/module2Entretien/planing/planing.component';
import { ChauffeurInterfaceComponent } from './rahma/module1Materiel/chauffeur-interface/chauffeur-interface.component';
import { VehiculeDispoComponent } from './rahma/module1Materiel/vehicule-dispo/vehicule-dispo.component';

import { NgChartsModule } from 'ng2-charts';
import { MatOptionModule } from '@angular/material/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { RecaptchaModule } from "ng-recaptcha";  // Import RecaptchaModule here

// Angular Material Modules
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserListComponent } from './user-list/user-list.component';
import { UserAdminADDComponent } from './user-admin-add/user-admin-add.component';
import { UserAdminUpdateComponent } from './user-admin-update/user-admin-update.component';
import { MatIconModule } from '@angular/material/icon';

import { MatInputModule } from '@angular/material/input';
import { PresenceModalComponent } from './presence-modal/presence-modal.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { GoogleCallbackComponent } from './google-callback/google-callback.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { PresenceemployModalComponent } from './presenceemploy-modal/presenceemploy-modal.component';
import { AddCongesComponent } from './add-conges/add-conges.component';
import { AddEquipeComponent } from './add-equipe/add-equipe.component';
import { AddReclamationComponent } from './add-reclamation/add-reclamation.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { CongesComponent } from './conges/conges.component';
import { DetailsDialogComponent } from './details-dialog/details-dialog.component'; // Import MatInputModule
import { NgxPaginationModule } from 'ngx-pagination';
import { EditCongesComponent } from './edit-conges/edit-conges.component';
import { EditEquipeComponent } from './edit-equipe/edit-equipe.component';
import { EditReclamationComponent } from './edit-reclamation/edit-reclamation.component';
import { EquipeComponent } from './equipe/equipe.component';
import {ListEquipeComponent } from './list-equipe/list-equipe.component';
import { ManageEquipeMembersComponent } from './manage-equipe-members/manage-equipe-members.component';
import { ReclamationsComponent } from './reclamations/reclamations.component';
import { SuccessDialogComponent } from './success-dialog/success-dialog.component';
import { ViewReclamationComponent } from './view-reclamation/view-reclamation.component';
import { ToastrModule } from 'ngx-toastr';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DocumentChatComponent } from './document-chat/document-chat.component';
import { EmployeeExitPredictionComponent } from './employee-exit-prediction/employee-exit-prediction.component';

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
    CongesComponent,
    AddFinanceComponent,
    EditFinanceComponent,
    FichedepaieComptableComponent,
    AppHeaderComponent,
    AppFooterComponent,
    ListEquipeComponent,
    AdminBackComponent,
    SearchResultsComponent,
    PaiementComponent,
    AddFichedepaieComponent,
    PaiementSuccessComponentComponent,
    PaiementCancelComponentComponent,
    SignaturePadComponent,
    RapportFinancierComponentComponent,
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
    UserListComponent,
    UserAdminADDComponent,
    UserAdminUpdateComponent,
    PresenceModalComponent,
    UserAccountComponent,
    ForgotPasswordComponent,
    DashboardUserComponent,
    GoogleCallbackComponent,
    AuthCallbackComponent,
    PresenceemployModalComponent,
    AddCongesComponent,
    AddEquipeComponent,
    AddReclamationComponent,
    ConfirmationDialogComponent,
    CongesComponent,
    DetailsDialogComponent,
    EditCongesComponent,
    EditEquipeComponent,
    EditReclamationComponent,
    EquipeComponent,
    ListEquipeComponent,
    ManageEquipeMembersComponent,
    ReclamationsComponent,
    SuccessDialogComponent,
    ViewReclamationComponent,
    DocumentChatComponent,
    EmployeeExitPredictionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgChartsModule,
    DragDropModule ,
    MatProgressSpinnerModule,
    MatStepperModule,
    ZXingScannerModule,
    RecaptchaModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    NgxPaginationModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    MatFormFieldModule,
  ],
  providers: [
    
    {
      provide: 'STRIPE_PUBLISHABLE_KEY',
      useValue: 'pk_test_51Qy2JjKpCQHkABgKARu62V68rkleu9aMJPS5sPQhG0i7llQ52C9wsHm5sPtwyg0C7sice93CFKXKVCqAAJhMX03X00oOdAFYjL',
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
