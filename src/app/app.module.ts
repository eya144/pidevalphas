import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { LogistiqueComponent } from './logistique/logistique.component';
import { RHComponent } from './rh/rh.component';
import { FinanceComponent } from './finance/finance.component';
import { InspectionComponent } from './inspection/inspection.component';
import { ContactComponent } from './contact/contact.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ServiceComponent } from './service/service.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BackMenuAdminComponent } from './back-menu-admin/back-menu-admin.component';
import { BackHeaderComponent } from './back-header/back-header.component';
import { ProjetComponent } from './projet/projet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddProjetComponent } from './add-projet/add-projet.component';
import { FooterHomeComponent } from './footer-home/footer-home.component';
import { HeaderComponent } from './header/header.component';
import { EditProjetComponent } from './edit-projet/edit-projet.component';
import { MapComponent } from './map/map.component';
import { MapSelectorComponentComponent } from './map-selector-component/map-selector-component.component';
import { MissionComponent } from './mission/mission.component';
import { AddMissionComponent } from './add-mission/add-mission.component';
import { DetailsProjetComponent } from './details-projet/details-projet.component';
import { MissionDetailsComponent } from './mission-details/mission-details.component';
import { UpdateMissionComponent } from './update-mission/update-mission.component';
import { TaskComponent } from './task/task.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { NgChartsModule } from 'ng2-charts';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSelectModule } from '@angular/material/select'; // Manquant
import { MatDatepickerModule } from '@angular/material/datepicker'; // Recommandé
import { MatNativeDateModule } from '@angular/material/core'; // Recommandé
import { MatMenuModule } from '@angular/material/menu'; // Pour les menus
import { MatTooltipModule } from '@angular/material/tooltip'; // Pour les tooltips
import { MatSnackBarModule } from '@angular/material/snack-bar'; // Pour les notifications
import { MatCheckboxModule } from '@angular/material/checkbox'; // Pour les cases à cocher
import { MatSlideToggleModule } from '@angular/material/slide-toggle'; // Pour les interrupteurs
import { MatRadioModule } from '@angular/material/radio'; // Pour les boutons radio

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
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
    ProjetComponent,
    AddProjetComponent,
    FooterHomeComponent,
    HeaderComponent,
    EditProjetComponent,
    MapComponent,
    MapSelectorComponentComponent,
    MissionComponent,
    AddMissionComponent,
    DetailsProjetComponent,
    MissionDetailsComponent,
    UpdateMissionComponent,
    TaskComponent,
    AddTaskComponent,
    UpdateTaskComponent,
    TaskDetailsComponent
  ],
  imports: [
    // Core Modules
    BrowserModule,
    BrowserAnimationsModule,
    
    // Functional Modules
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    
    // Material Modules (grouped by functionality)
    // Form Controls
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    
    // Navigation & Layout
    MatMenuModule,
    LayoutModule,
    
    // Buttons & Indicators
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    
    // Popups & Modals
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    
    // Data Table
    MatCardModule,
    
    // CDK
    DragDropModule,
    
    // Third-party
    NgChartsModule,
    NgxPaginationModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    
    // App Routing (should be last)
    AppRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
