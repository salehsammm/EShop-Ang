import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatTooltip } from '@angular/material/tooltip';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogEditFieldComponent } from '../dialog-edit-field/dialog-edit-field.component';
import { AuthenticationService } from '../../services/authentication.service';
import { UserDto } from '../../models/user-dto';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar'; 

@Component({
  selector: 'app-dialog-edit-name',
  imports: [MatDividerModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule, FormsModule,
             MatTooltip, MatSnackBarModule],
  templateUrl: './dialog-edit-name.component.html',
  styleUrl: './dialog-edit-name.component.css'
})
export class DialogEditNameComponent implements OnInit {
  name: string = '';
  dialogTitle: string = '';
  inputLabel: string = '';
  hint: string = '';
  user: UserDto | null = null;
  userId: string | null = null;
  private snackBar = inject(MatSnackBar);

  constructor(public dialogRef: MatDialogRef<DialogEditFieldComponent>, private authenticationService: AuthenticationService) { }

  @Output() fieldUpdate = new EventEmitter<string>();
  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    if (this.userId) {
      this.authenticationService.getUser().subscribe({
        next: (user) => {
          this.user = user;
        },
        error: (err) => {
          console.error(err);
        }
      })
    }
  }

  closeDialog() {
    this.fieldUpdate.emit('1');
    this.dialogRef.close();
  }

  setFName() {
    this.dialogTitle = 'ویرایش نام کوچک';
    this.inputLabel = 'نام کوچک';
    this.hint = 'نام جدید خود را وارد کنید';
  }
  setLName() {
    this.dialogTitle = 'ویرایش نام خانوادگی';
    this.inputLabel = 'نام خانوادگی';
    this.hint = 'نام خانوادگی خود را وارد کنید';
  }
  setUserName() {
    this.dialogTitle = 'ویرایش نام کاربری';
    this.inputLabel = 'نام کاربری';
    this.hint = 'نام کاربری خود را وارد کنید';
  }

  editField(inputValue: string) {
    if (this.user) {
      switch (this.inputLabel) {
        case 'نام کوچک':
          this.user.fName = inputValue;
          break;
        case 'نام خانوادگی':
          this.user.lName = inputValue;
          break;
        case 'نام کاربری':
          this.user.userName = inputValue;
          break;
        default:
          console.log('error is switch case');
      }
      this.authenticationService.updateUser(this.user).subscribe({
        next: () => {
          console.log('success');
          this.snackBar.open(this.inputLabel + '  شما با موفقیت تغییر کرد!' , 'بستن',{
            duration: 2000
          });
          this.closeDialog();
        },
        error: (err) => {
          console.error(err);
        }
      })
    }
  }

}
