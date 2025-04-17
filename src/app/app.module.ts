import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts'

import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { AboutComponent } from './about/about.component';
import { LogistiqueComponent } from './logistique/logistique.component';
import { RHComponent } from './rh/rh.component';
import { FinanceComponent } from './finance/finance.component';


import { ContactComponent } from './contact/contact.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ServiceComponent } from './service/service.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BackMenuAdminComponent } from './back-menu-admin/back-menu-admin.component';
import { BackHeaderComponent } from './back-header/back-header.component';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NonConformityEditComponent } from './nonconformity-edit/nonconformity-edit.component';
import { NonConformityListComponent } from './nonconformity-list/nonconformity-list.component';
import { NonConformityDetailComponent } from './nonconformity-detail/nonconformity-detail.component';
import { ActionListComponent } from './action-list/action-list.component';
import { AddActionComponent } from './add-action/add-action.component';
import { ActionDetailComponent } from './action-detail/action-detail.component';
import { EditActionComponent } from './edit-action/edit-action.component';
import { InspectionListComponent } from './inspection-list.component/inspection-list.component.component';
import { InspectionDetailComponent } from './inspection-detail/inspection-detail.component';
import { InspectionEditComponent } from './inspection-edit/inspection-edit.component';
import { InspectionAddComponent } from './inspection-add/inspection-add.component';

import { RapportAddComponent } from './rapport-add/rapport-add.component';

import { RapportListComponent } from './rapport-list/rapport-list.component';
import { AddNonconformityComponent } from './add-nonconformity/add-nonconformity.component';
import { MenuFrontComponent } from './menu-front/menu-front.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterFrontComponent } from './footer-front/footer-front.component';
import { RapportDetailComponent } from './rapport-detail/rapport-detail.component';
import { UpdateRapportComponent } from './update-rapport/update-rapport.component';
import { ShowinspectionsComponent } from './showinspections/showinspections.component';
import { ListadmininspectionComponent } from './listadmininspection/listadmininspection.component';
import { UpdateadmininspectionComponent } from './updateadmininspection/updateadmininspection.component';

import { StatistiqueComponent } from './statistique/statistique.component';
import { StatistiqueadminComponent } from './statistiqueadmin/statistiqueadmin.component';
import { CahierDesChargesAddComponent } from './cahier-des-charges-add/cahier-des-charges-add.component';
import { ListecahierpararchitectComponent } from './listecahierpararchitect/listecahierpararchitect.component';

import { UpdatecahierComponent } from './updatecahier/updatecahier.component';
import { ListeAllcahierdechargeComponent } from './liste-allcahierdecharge/liste-allcahierdecharge.component';
import { ProjectStatistiquesComponent } from './project-statistiques/project-statistiques.component';
import { CahiernavbarComponent } from './cahiernavbar/cahiernavbar.component';




@NgModule({
  declarations: [
    AppComponent,
  
    HomeComponent,
    ProductComponent,
    AboutComponent,
    StatistiqueComponent,
  
    LogistiqueComponent,
    RHComponent,
    FinanceComponent,
 
 
    ContactComponent,
      InscriptionComponent,
      ServiceComponent,
      DashboardComponent,
      BackMenuAdminComponent,
      BackHeaderComponent,
   

    NonConformityEditComponent,
      NonConformityDetailComponent,
      NonConformityListComponent,
      ActionListComponent,
      AddActionComponent,
      ActionDetailComponent,
      EditActionComponent,
      InspectionListComponent,
      InspectionDetailComponent,
      InspectionEditComponent,
      InspectionAddComponent,
     
      RapportAddComponent,
 
      RapportListComponent,
      AddNonconformityComponent,
      MenuFrontComponent,
      FooterFrontComponent,
      RapportDetailComponent,
      UpdateRapportComponent,
      ShowinspectionsComponent,
      ListadmininspectionComponent,
      UpdateadmininspectionComponent,
      StatistiqueadminComponent,
      CahierDesChargesAddComponent,
      ListecahierpararchitectComponent,
      UpdatecahierComponent,
      ListeAllcahierdechargeComponent,
      ProjectStatistiquesComponent,
      CahiernavbarComponent,
      
  ],
  imports: [
    FontAwesomeModule,
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    HttpClientModule ,
    FormsModule, // 
    ReactiveFormsModule,
    NgChartsModule,
  
    

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
