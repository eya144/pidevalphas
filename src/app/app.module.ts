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
import { NgxPrintModule } from 'ngx-print';
import { MatOptionModule } from '@angular/material/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { RecaptchaModule } from "ng-recaptcha";  // Import RecaptchaModule here
// Duplicate import removed
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
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatExpansionModule } from '@angular/material/expansion';
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
import { LayoutModule } from '@angular/cdk/layout';
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
import { ProjetComponent } from './projet/projet.component';
import { AddProjetComponent } from './add-projet/add-projet.component';
import { EditProjetComponent } from './edit-projet/edit-projet.component';
import { DetailsProjetComponent } from './details-projet/details-projet.component';
import { MissionComponent } from './mission/mission.component';
import { AddMissionComponent } from './add-mission/add-mission.component';
import { UpdateMissionComponent } from './update-mission/update-mission.component';
import { MissionDetailsComponent } from './mission-details/mission-details.component';
import { RapportProjetComponent } from './rapport-projet/rapport-projet.component';
import { TaskComponent } from './task/task.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { MapComponent } from './map/map.component';
import { MapSelectorComponentComponent } from './map-selector-component/map-selector-component.component';
import { CahierDesChargesAddComponent } from './cahier-des-charges-add/cahier-des-charges-add.component';
import { EditActionComponent } from './edit-action/edit-action.component';
import { ListecahierpararchitectComponent } from './listecahierpararchitect/listecahierpararchitect.component';
import { ActionDetailComponent } from './action-detail/action-detail.component';
import { ActionListComponent } from './action-list/action-list.component';
import { AddActionComponent } from './add-action/add-action.component';
import { FooterFrontComponent } from './footer-front/footer-front.component';
import { NonConformityEditComponent } from './non-conformity-edit/non-conformity-edit.component';
import { DashboardaComponent } from './dashboarda/dashboarda.component';
import { NonConformityDetailComponent } from './non-conformity-detail/non-conformity-detail.component';
import { InspectionAddComponent } from './inspection-add/inspection-add.component';
import { RapportDetailComponent } from './rapport-detail/rapport-detail.component';
import { StatistiqueadminComponent } from './statistiqueadmin/statistiqueadmin.component';
import { ShowinspectionsComponent } from './showinspections/showinspections.component';
import { ListadmininspectionComponent } from './listadmininspection/listadmininspection.component';
import { UpdateadmininspectionComponent } from './updateadmininspection/updateadmininspection.component';
import { StatistiqueComponent } from './statistique/statistique.component';
import { InspectionDetailComponent } from './inspection-detail/inspection-detail.component';
import { InspectionEditComponent } from './inspection-edit/inspection-edit.component';
import { InspectionListComponent } from './inspection-list/inspection-list.component';
import { NonConformityListComponent } from './non-conformity-list/non-conformity-list.component';
import { RapportAddComponent } from './rapport-add/rapport-add.component';
import { RapportListComponent } from './rapport-list/rapport-list.component';
import { AddNonconformityComponent } from './add-nonconformity/add-nonconformity.component';
import { UpdateRapportComponent } from './update-rapport/update-rapport.component';
import { UpdatecahierComponent } from './updatecahier/updatecahier.component';
import { ListeAllcahierdechargeComponent } from './liste-allcahierdecharge/liste-allcahierdecharge.component';
import { ProjectStatistiquesComponent } from './project-statistiques/project-statistiques.component';
import { CahiernavbarComponent } from './cahiernavbar/cahiernavbar.component';
import { MenuFrontComponent } from './menu-front/menu-front.component';

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
    ProjetComponent,
    AddProjetComponent,
    EditProjetComponent,
    DetailsProjetComponent,
    MissionComponent,
    AddMissionComponent,
    UpdateMissionComponent,
    MissionDetailsComponent,
    RapportProjetComponent,
    TaskComponent,
    TaskDetailsComponent,
    UpdateTaskComponent,
    AddTaskComponent,
    MapComponent,
    MapSelectorComponentComponent,
    CahierDesChargesAddComponent,
    EditActionComponent,
    ListecahierpararchitectComponent,
    ActionDetailComponent,
    ActionListComponent,
    AddActionComponent,
    FooterFrontComponent,
    NonConformityEditComponent,
    DashboardaComponent,
    NonConformityDetailComponent,
    InspectionAddComponent,
    RapportDetailComponent,
    StatistiqueadminComponent,
    ShowinspectionsComponent,
    ListadmininspectionComponent,
    UpdateadmininspectionComponent,
    StatistiqueComponent,
    InspectionDetailComponent,
    InspectionEditComponent,
    InspectionListComponent,
    NonConformityListComponent,
    RapportAddComponent,
    RapportListComponent,
    AddNonconformityComponent,
    UpdateRapportComponent,
    UpdatecahierComponent,
    ListeAllcahierdechargeComponent,
    ProjectStatistiquesComponent,
    CahiernavbarComponent,
    MenuFrontComponent,
   
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  
    // Angular Material Modules (une seule fois chacun)
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatStepperModule,
  
    // CDK & Layout
    LayoutModule,
    DragDropModule,
  
    // External modules
    NgChartsModule,
    NgxPaginationModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    ZXingScannerModule,
    RecaptchaModule,
    NgxPrintModule,
    
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
