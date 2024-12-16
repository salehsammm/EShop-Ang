import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button'; 
import {MatIconModule} from '@angular/material/icon'; 

@Component({
  selector: 'app-dialog-not-login',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './dialog-not-login.component.html',
  styleUrl: './dialog-not-login.component.css'
})
export class DialogNotLoginComponent {

  constructor(public dialogRef: MatDialogRef<DialogNotLoginComponent>){};

  close() {
    this.dialogRef.close();
  }

}
