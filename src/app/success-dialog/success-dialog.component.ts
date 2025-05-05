import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-dialog',
  template: `
   <h2 mat-dialog-title>Success</h2>
<mat-dialog-content>
  Invoice added successfully!
</mat-dialog-content>
<mat-dialog-actions>
  <button mat-button (click)="onOkClick()">OK</button>
</mat-dialog-actions>
  `,
})
export class SuccessDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router // Inject Router
  ) {}

  onOkClick(): void {
    this.dialogRef.close();
    this.router.navigate(['/finance']); // Rediriger vers la liste des factures
  }
}