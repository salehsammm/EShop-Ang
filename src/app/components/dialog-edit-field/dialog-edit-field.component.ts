import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatTooltip } from '@angular/material/tooltip';
import { MatDialogRef } from '@angular/material/dialog';
import { UserDto } from '../../models/user-dto';
import { AuthenticationService } from '../../services/authentication.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar'; 

@Component({
  selector: 'app-dialog-edit-field',
  imports: [MatDividerModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule, FormsModule,
     MatTooltip, MatSnackBarModule],
  templateUrl: './dialog-edit-field.component.html',
  styleUrl: './dialog-edit-field.component.css'
})
export class DialogEditFieldComponent implements OnInit {
  phoneNumber: string = '';
  user: UserDto | null = null;
  userId: string | null = null;
  private snackBar = inject(MatSnackBar);
  
  @Output() fieldUpdate = new EventEmitter<string>();
  constructor(public dialogRef: MatDialogRef<DialogEditFieldComponent>, private authenticationService: AuthenticationService) { }

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
    this.fieldUpdate.emit('2');
    this.dialogRef.close();
  }

  editPhoneNumber(phoneNumber: string) {
    if (this.user) {
      this.user.phoneNumber = phoneNumber;
      this.authenticationService.updateUser(this.user).subscribe({
        next: () => {
          console.log('success');
          this.snackBar.open(' شماره موبایل شما با موفقیت تغییر کرد!' , 'بستن',{
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
