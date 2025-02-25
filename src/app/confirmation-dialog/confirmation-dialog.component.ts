import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
   <h2 mat-dialog-title>Confirmation</h2>
<mat-dialog-content>
  Are you sure you want to add this ?
</mat-dialog-content>
<mat-dialog-actions>
  <button mat-button (click)="onNoClick()">No</button>
  <button mat-button (click)="onYesClick()" cdkFocusInitial>Yes</button>
</mat-dialog-actions>
  `,
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router // Inject Router
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true); // Fermer le dialogue et retourner "true"
    this.router.navigate(['/finance']); // Rediriger vers la liste des factures
  }
}