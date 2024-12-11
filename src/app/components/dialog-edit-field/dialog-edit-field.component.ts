import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import {MatTooltip} from '@angular/material/tooltip';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-edit-field',
  imports: [MatDividerModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule, FormsModule, MatTooltip],
  templateUrl: './dialog-edit-field.component.html',
  styleUrl: './dialog-edit-field.component.css'
})
export class DialogEditFieldComponent {
  phoneNumber: string = '';

  constructor(public dialogRef: MatDialogRef<DialogEditFieldComponent>) {}

  closeDialog() {
    this.dialogRef.close();
  }

}
