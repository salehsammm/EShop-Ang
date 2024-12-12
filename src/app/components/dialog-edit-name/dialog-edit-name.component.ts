import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatTooltip } from '@angular/material/tooltip';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogEditFieldComponent } from '../dialog-edit-field/dialog-edit-field.component';

@Component({
  selector: 'app-dialog-edit-name',
  imports: [MatDividerModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule, FormsModule, MatTooltip],
  templateUrl: './dialog-edit-name.component.html',
  styleUrl: './dialog-edit-name.component.css'
})
export class DialogEditNameComponent {
  name: string = '';
  dialogTitle: string = '';
  inputLabel: string = '';
  hint: string = '';

  constructor(public dialogRef: MatDialogRef<DialogEditFieldComponent>) { }

  closeDialog() {
    this.dialogRef.close();
  }

  setFName(){
    this.dialogTitle = 'ویرایش نام کوچک';
    this.inputLabel = 'نام جدید';
    this.hint = 'نام جدید خود را وارد کنید';
  }

  setLName(){
    this.dialogTitle = 'ویرایش نام خانوادگی';
    this.inputLabel = 'نام خانوادگی';
    this.hint = 'نام خانوادگی خود را وارد کنید';
  }

  setUserName(){
    this.dialogTitle = 'ویرایش نام کاربری';
    this.inputLabel = 'نام کاربری';
    this.hint = 'نام کاربری خود را وارد کنید';
  }
  
}
