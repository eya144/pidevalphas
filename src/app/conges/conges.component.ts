import { Component } from '@angular/core';
import { CongesService } from '../conges.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-conges',
  templateUrl: './conges.component.html',
  styleUrls: ['./conges.component.css']
})
export class CongesComponent {


  constructor(
    private congesService: CongesService,
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
    this.congesService.getAll().subscribe(
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

  deleteConges(id: number) {

    const isConfirmed = confirm('Are you sure you want to delete this team?');
    if (isConfirmed) {


      this.congesService.delete(id).subscribe(
        (data) => {
          console.log('Equipe deleted', data);
          this.toastr.success('Conges deleted successfully');
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

  addConges() {
    this.router.navigate(['/add-conges']);
  }

  add() {
    this.congesService.add({
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

  editConges(id: number) {
    this.router.navigate(['/edit-conges', id]);
  }


}
