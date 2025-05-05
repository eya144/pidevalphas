import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListEquipeComponent } from '../list-equipe/list-equipe.component';
import { EquipeService } from '../equipe.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AddEquipeComponent } from '../add-equipe/add-equipe.component';
import { EditEquipeComponent } from '../edit-equipe/edit-equipe.component';
import { ManageEquipeMembersComponent } from '../manage-equipe-members/manage-equipe-members.component';


@NgModule({
  
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    
  ],
  providers: [
    EquipeService
  ],
  declarations: [
     //AddEquipeComponent,
    EditEquipeComponent,
    
     //ManageEquipeMembersComponent
  ]
})
export class EquipeModule { }
