import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrls: ['./details-dialog.component.css']
})
export class DetailsDialogComponent {

  isResolved!: boolean;
  stepStatus: any;
  thirdFormGroup!: AbstractControl;

  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  cvSent = false;
  step: any;
  reclamationSent: any;
  responseReceived: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DetailsDialogComponent>
  ) {
    this.isResolved = data.isResolved;

    this.firstFormGroup = this.fb.group({
      nameCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.fb.group({
      emailCtrl: ['', Validators.required]
    });
  }

  onNextStep() {
    this.cvSent = true;
  }

  openDetailsDialog() {
    this.dialog.open(DetailsDialogComponent, {
      width: '600px'
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  openResponseDialog() {
    // You can implement the actual logic to display a dialog with response data
    throw new Error('Method not implemented.');
  }

  showPendingMessage() {
    if (!this.isResolved) {
      this.snackBar.open("Your complaint has not been processed yet", "Close", {
        duration: 4000,
        panelClass: ['warning-snackbar']
      });
    }
  }
}
