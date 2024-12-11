import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-not-login',
  imports: [],
  templateUrl: './dialog-not-login.component.html',
  styleUrl: './dialog-not-login.component.css'
})
export class DialogNotLoginComponent {

  constructor(public dialogRef: MatDialogRef<DialogNotLoginComponent>){};

  close() {
    this.dialogRef.close();
  }

}
