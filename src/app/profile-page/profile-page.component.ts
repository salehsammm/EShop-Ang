import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UserDto } from '../models/user-dto';

@Component({
  selector: 'app-profile-page',
  imports: [],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit {
  user: UserDto | null = null;
  userId:string | null=null;
  constructor(private authenticationService: AuthenticationService) { };
  
  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    if (this.userId) {
      this.getUser();
    }
  }
;

  getUser(): void {
    this.authenticationService.getUserById().subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (error) => {
        console.error('error getting user',(error))
      }
    });
  }


}
