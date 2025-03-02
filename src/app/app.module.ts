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
import { NgChartsModule } from 'ng2-charts';


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
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    NgChartsModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
