import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatTooltip } from '@angular/material/tooltip';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-edit-field',
  imports: [MatDividerModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule, FormsModule, MatTooltip],
  templateUrl: './dialog-edit-field.component.html',
  styleUrl: './dialog-edit-field.component.css'
})
export class DialogEditFieldComponent {
  phoneNumber: string = '';
  dialogTitle: string = '';
  inputLabel: string = '';
  inputValue: string = '';
  inputPattern: string = '';
  inputMinLength: number = 0;
  inputMaxLength: number = 1000;
  hint: string = '';
  requiredError: string = ''; 
  validationError: string = '';

  constructor(public dialogRef: MatDialogRef<DialogEditFieldComponent>) { }

  closeDialog() {
    this.dialogRef.close();
  }

  setPhoneNumber(){
    this.dialogTitle = 'ویراش شماره موبایل';
    this.inputLabel = 'شماره موبایل جدید';
    this.hint = 'شماره موبایل جدید خود را وارد کنید';
    this.requiredError = 'اینجا را خالی نگذارید';
    this.validationError = ' شماره موبایل به شکل درست وارد نشده';
    this.inputPattern = '^[0-9]*$';
    this.inputMinLength = 10;
    this.inputMaxLength = 12;
  }

  setFName(){
    this.dialogTitle = 'ویراش نام کوچک';
    this.inputLabel = 'نام جدید';
    this.hint = 'نام جدید خود را وارد کنید';
    this.requiredError = 'اینجا را خالی نگذارید';
  }

}
