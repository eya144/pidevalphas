import { Component } from '@angular/core';
import { EquipeService } from '../equipe.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-equipe',
  templateUrl: './list-equipe.component.html',
  styleUrls: ['./list-equipe.component.css']

})
export class ListEquipeComponent {



  constructor(
    private equipeService: EquipeService,
    private router: Router,
    private toastr: ToastrService
  ){
  }

  list: any[] = [];
  isLoading: boolean = false;

  currentPage: number = 1;
  itemsPerPage: number = 5;


  ngOnInit(): void {
    this.isLoading = true;
    this.getAll();
  }

  getAll() {
    this.equipeService.getAll().subscribe(
      (data) => {
        console.log('Equipe data', data);
        console.log(data);
        // this.list = data as any[];
        this.list = data as any[];
        this.isLoading = false;
      },
      (error) => {
        console.log('Error', error);
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  deleteTeam(id: number) {

    const isConfirmed = confirm('Are you sure you want to delete this team?');
    if (isConfirmed) {


      this.equipeService.delete(id).subscribe(
        (data) => {
          console.log('Equipe deleted', data);
          this.toastr.success('Equipe deleted successfully');
          this.getAll();
        },
        (error) => {
          console.log('Error', error);
          console.log(error);
        }
      );
    } else {
      console.log('Delete canceled');
    }
  }

  addTeam() {
    this.router.navigate(['/add-team']);
  }

  add() {
    this.equipeService.add({
      nom: 'Equipe 1',
      description: 'Description 1'
    }).subscribe(
      (data) => {
        console.log('Equipe added', data);
        this.getAll();
      },
      (error) => {
        console.log('Error', error);
        console.log(error);
      }
    );
  }

  editTeam(id: number) {
    this.router.navigate(['/edit-team', id]);
  }

  manageMembers(id: number) {
    this.router.navigate(['/manage-members', id]);
  }



}
