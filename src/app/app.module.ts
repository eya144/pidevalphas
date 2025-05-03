import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'; // Nécessaire pour ngModel
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AppHeaderComponent } from './app-header/app-header.component';

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
import { MatDialogModule } from '@angular/material/dialog'; // Assurez-vous d'importer cela

import { ContactComponent } from './contact/contact.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ServiceComponent } from './service/service.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BackMenuAdminComponent } from './back-menu-admin/back-menu-admin.component';
import { BackHeaderComponent } from './back-header/back-header.component';
import { UserListComponent } from '../app/user-list/user-list.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { UserAdminADDComponent } from './user-admin-add/user-admin-add.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserAdminUpdateComponent } from './user-admin-update/user-admin-update.component';
import { PresenceModalComponent } from './presence-modal/presence-modal.component';
import { UserService } from './ServiceUser/user.service';
import { GoogleCallbackComponent } from './google-callback/google-callback.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { RecaptchaModule } from "ng-recaptcha";
import { PresenceemployModalComponent } from './presenceemploy-modal/presenceemploy-modal.component';
import { AddCongesComponent } from './add-conges/add-conges.component';
import { AddReclamationComponent } from './add-reclamation/add-reclamation.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { CongesComponent } from './conges/conges.component';
import { DetailsDialogComponent } from './details-dialog/details-dialog.component';
import { DocumentChatComponent } from './document-chat/document-chat.component';
import { EditCongesComponent } from './edit-conges/edit-conges.component';
import { EditReclamationComponent } from './edit-reclamation/edit-reclamation.component';
import { EquipeComponent } from './equipe/equipe.component';
import { ToastrModule } from 'ngx-toastr';
import { AddEquipeComponent } from './add-equipe/add-equipe.component';
import { EditEquipeComponent } from './edit-equipe/edit-equipe.component';
import { ListEquipeComponent } from './list-equipe/list-equipe.component';
import { ManageEquipeMembersComponent } from './manage-equipe-members/manage-equipe-members.component';
import { SuccessDialogComponent } from './success-dialog/success-dialog.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { ViewReclamationComponent } from './view-reclamation/view-reclamation.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReclamationsComponent } from './reclamations/reclamations.component';







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
    AppHeaderComponent,
    InspectionComponent,
    AppFooterComponent,
    ReclamationsComponent,
 
    ContactComponent,
      InscriptionComponent,
      ServiceComponent,
      DashboardComponent,
      BackMenuAdminComponent,
      BackHeaderComponent,
      UserListComponent,
      DashboardUserComponent,
      UserAdminADDComponent,
      UserAdminUpdateComponent,
      PresenceModalComponent,
      GoogleCallbackComponent,
      ForgotPasswordComponent,
      UserAccountComponent,
      AuthCallbackComponent,
      PresenceemployModalComponent,
      AddCongesComponent,
      AddReclamationComponent,
      ConfirmationDialogComponent,
      CongesComponent,
      DetailsDialogComponent,
      DocumentChatComponent,
      EditCongesComponent,
      EditReclamationComponent,
      EquipeComponent,
      AddEquipeComponent,
      EditEquipeComponent,
      ListEquipeComponent,
      ManageEquipeMembersComponent,
      SuccessDialogComponent,
      ViewReclamationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatDialogModule,
    DragDropModule,
    MatStepperModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatButtonModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    MatIconModule,
    RecaptchaModule,
    BrowserAnimationsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
