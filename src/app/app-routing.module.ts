import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { AboutComponent } from './about/about.component';
import { RHComponent } from './rh/rh.component';
import { LogistiqueComponent } from './logistique/logistique.component';
import { FinanceComponent } from './finance/finance.component';
import { ContactComponent } from './contact/contact.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ServiceComponent } from './service/service.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { NonConformityListComponent } from './nonconformity-list/nonconformity-list.component';
import { NonConformityEditComponent } from './nonconformity-edit/nonconformity-edit.component';
import { NonConformityDetailComponent } from './nonconformity-detail/nonconformity-detail.component';
import { ActionListComponent } from './action-list/action-list.component';
import { AddActionComponent } from './add-action/add-action.component';
import { ActionDetailComponent } from './action-detail/action-detail.component';
import { EditActionComponent } from './edit-action/edit-action.component';
import { InspectionDetailComponent } from './inspection-detail/inspection-detail.component';
import { InspectionEditComponent } from './inspection-edit/inspection-edit.component';
import { InspectionListComponent } from './inspection-list.component/inspection-list.component.component';
import { InspectionAddComponent } from './inspection-add/inspection-add.component';

import { RapportAddComponent } from './rapport-add/rapport-add.component';
import { RapportListComponent } from './rapport-list/rapport-list.component';

import { AddNonconformityComponent } from './add-nonconformity/add-nonconformity.component';
import { MenuFrontComponent } from './menu-front/menu-front.component';
import { FooterFrontComponent } from './footer-front/footer-front.component';
import { RapportDetailComponent} from './rapport-detail/rapport-detail.component';
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


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'produit', component: ProductComponent },
  { path: 'about', component: AboutComponent },
  { path: 'RH', component: RHComponent },
  { path: 'cahiercharge/:architecteId', component: CahierDesChargesAddComponent },
  { path: 'edit-action/:id', component: EditActionComponent },
  { path: 'cahierspararchitecte/:architecteId', component: ListecahierpararchitectComponent },

  { path: 'action-detail/:id', component: ActionDetailComponent },
  
  { path: 'logistique', component: LogistiqueComponent },
  { path: 'actions', component: ActionListComponent },
  { path: 'add-action', component: AddActionComponent },
  { path: 'finance', component: FinanceComponent },
  { path: 'contact', component: ContactComponent },

  { path: 'footer', component: FooterFrontComponent },


  { path: 'inscrire', component: InscriptionComponent },
  { path: 'service', component: ServiceComponent },
  { path: 'service', component: ServiceComponent }, 
   { path: 'dashboard', component: DashboardComponent },
 
   { path: 'dashboard', component: DashboardComponent },
 

   

  { path: 'NonConformityEdit/:id', component: NonConformityEditComponent },
  { path: 'Nonconform/:id', component: NonConformityDetailComponent},
  { path: 'addinspection', component: InspectionAddComponent },
  { path: 'rapport-detail/:id', component: RapportDetailComponent }, 
   { path: 'statadmin', component: StatistiqueadminComponent },
  
  { path: 'showinspections', component: ShowinspectionsComponent},
  { path: 'listadmininspection', component: ListadmininspectionComponent},
  { path: 'updateadmin/:id', component: UpdateadmininspectionComponent},
  { path: 'statistique', component: StatistiqueComponent},


  { path: 'inspection-detail/:id', component: InspectionDetailComponent },
  { path: 'edit-inspection/:id', component: InspectionEditComponent },
  { path: 'inspections', component: InspectionListComponent },
   { path: 'addinspection', component: InspectionAddComponent },
   { path: 'NonConformities', component: NonConformityListComponent },

 
   { path: 'edit-Rapport/:id', component: RapportAddComponent },
   { path: 'RapportList', component: RapportListComponent },
    { path: 'report/:id', component: RapportAddComponent },
    { path: 'menu', component: MenuFrontComponent },
  
      { path: 'addnonconformity/:id', component: AddNonconformityComponent },
      { path: 'nonConformities/:id/add-action', component: AddActionComponent } ,
      { path: 'update-rapport/:id', component: UpdateRapportComponent },
      { path: 'editcahier/:id', component: UpdatecahierComponent },
      { path: 'listeCahier', component: ListeAllcahierdechargeComponent },
      { path: 'projetStatistique', component: ProjectStatistiquesComponent },
      
      { path: 'app-cahiernavbar', component: CahiernavbarComponent },
    
  { path: '', redirectTo:'/home',pathMatch:'full' },


];

 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
