import { Component, inject, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UserDto } from '../models/user-dto';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DialogEditFieldComponent } from '../components/dialog-edit-field/dialog-edit-field.component';
import { DialogEditNameComponent } from '../components/dialog-edit-name/dialog-edit-name.component';

@Component({
  selector: 'app-profile-page',
  imports: [MatIconModule, MatTooltipModule, MatDialogModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit {
  user: UserDto | null = null;
  userId:string | null=null;
  readonly dialog = inject(MatDialog);

  constructor(private authenticationService: AuthenticationService) { };
  
  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    if (this.userId) {
      this.getUser();
    }
  }
;

  getUser(): void {
    this.authenticationService.getUser().subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (error) => {
        console.error('error getting user',(error))
      }
    });
  }

  openEditPhoneDialog(): void {
    const dialogRef = this.dialog.open(DialogEditFieldComponent, {
      width: '30%',
      height: '32%',  
      maxWidth: '900px',  
    });

    dialogRef.componentInstance.fieldUpdate.subscribe(()=>{
      if (this.user) {
        this.getUser();
      }
    })
  }

  openEditFNameDialog(): void {
    const dialogRef = this.dialog.open(DialogEditNameComponent, {
      width: '30%',
      height: '32%',  
      maxWidth: '900px',  
    });
    dialogRef.componentInstance.setFName();

    dialogRef.componentInstance.fieldUpdate.subscribe(()=>{
      if (this.user) {
        this.getUser();
      }
    })
  }

  openEditLNameDialog(): void {
    const dialogRef = this.dialog.open(DialogEditNameComponent, {
      width: '30%',
      height: '32%',  
      maxWidth: '900px',  
    });
    dialogRef.componentInstance.setLName();

    dialogRef.componentInstance.fieldUpdate.subscribe(()=>{
      if (this.user) {
        this.getUser();
      }
    })
  }

  openEditUserNameDialog(): void {
    const dialogRef = this.dialog.open(DialogEditNameComponent, {
      width: '30%',
      height: '32%',  
      maxWidth: '900px',  
    });
    dialogRef.componentInstance.setUserName();

    dialogRef.componentInstance.fieldUpdate.subscribe(()=>{
      if (this.user) {
        this.getUser();
      }
    })
  }
}
