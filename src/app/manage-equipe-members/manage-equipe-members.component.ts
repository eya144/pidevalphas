import { Component, OnInit } from '@angular/core';
import { EquipeService } from '../equipe.service';
import {
  CdkDragDrop,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-equipe-members',
  templateUrl: './manage-equipe-members.component.html',
  styleUrls: ['./manage-equipe-members.component.css'],
})
export class ManageEquipeMembersComponent implements OnInit {

  constructor(
    private equipeService: EquipeService,
    private route: ActivatedRoute,
    private toastr: ToastrService // Inject ToastrService
  ) { }

  teamId: number | null = null;
  members: any[] = [];      // Members of the selected team
  notMembers: any[] = [];   // Users not in the team
  isLoading: boolean = false;

  ngOnInit(): void {
    this.teamId = Number(this.route.snapshot.paramMap.get('id')); // Get team ID from route
    this.isLoading = true;
    this.getUsersList();
  }

  getUsersList() {
    this.equipeService.getUsers().subscribe(
      (data: any) => {
        console.log('Users data', data);
        this.members = data.filter((user: any) => user.equipe_id === this.teamId);
        this.notMembers = data.filter((user: any) => user.equipe_id !== this.teamId);
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching users', error);
        this.isLoading = false;
      }
    );
  }

  /**
   * Called when a user is dropped into the "Team Members" list
   */
  onAddToTeam(event: CdkDragDrop<any[]>) {
    const user = event.previousContainer.data[event.previousIndex];

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

    this.equipeService.addMember(Number(this.teamId), user.id).subscribe(
      () => {
        user.equipe_id = this.teamId;
        this.toastr.success(`${user.nomUtilisateur} added to the team!`, 'Success');
      },
      (error) => {
        console.error('Error adding user to team', error);
        this.toastr.error(`Failed to add ${user.nomUtilisateur} to the team.`, 'Error');

        // Revert UI change if API fails
        transferArrayItem(
          event.container.data,
          event.previousContainer.data,
          event.currentIndex,
          event.previousIndex
        );
      }
    );
  }

  /**
   * Called when a user is dropped into the "Not in Team" list
   */
  onRemoveFromTeam(event: CdkDragDrop<any[]>) {
    const user = event.previousContainer.data[event.previousIndex];

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

    this.equipeService.removeMember(Number(this.teamId), user.id).subscribe(
      () => {
        user.equipe_id = null;
        this.toastr.info(`${user.nomUtilisateur} removed from the team!`, 'Info');
      },
      (error) => {
        console.error('Error removing user from team', error);
        this.toastr.error(`Failed to remove ${user.nomUtilisateur} from the team.`, 'Error');

        // Revert UI change if API fails
        transferArrayItem(
          event.container.data,
          event.previousContainer.data,
          event.currentIndex,
          event.previousIndex
        );
      }
    );
  }

  trackByFn(index: number, item: any): any {
    return item.id;
  }
}
